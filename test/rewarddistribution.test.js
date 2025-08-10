const { expect } = require("chai");

describe("RewardDistribution", function () {
  let EcoCoin, ecoCoin;
  let EcoNFT, ecoNFT;
  let RewardDistribution, rewardDist;
  let deployer, sme, customer, verifier;

  beforeEach(async () => {
    [deployer, sme, customer, verifier] = await ethers.getSigners();

    // Deploy EcoCoin
    const initialSupply = 1000;
    EcoCoin = await ethers.getContractFactory("EcoCoin");
    ecoCoin = await EcoCoin.deploy(initialSupply);
    await ecoCoin.waitForDeployment();

    // Deploy EcoNFT
    EcoNFT = await ethers.getContractFactory("EcoNFT");
    ecoNFT = await EcoNFT.deploy(deployer.address);
    await ecoNFT.waitForDeployment();

    RewardDistribution = await ethers.getContractFactory("RewardDistribution");
    rewardDist = await RewardDistribution.deploy(ecoCoin.target, ecoNFT.target);
    await rewardDist.waitForDeployment();

    // Transfer EcoCoin ownership to RewardDistribution so it can mint
    await ecoCoin.transferOwnership(rewardDist.target);

    // Add verifier
    await rewardDist.addVerifier(verifier.address);

    // Transfer ownership of EcoNFT to deployer already set in constructor
    await ecoNFT.connect(deployer).mintNFT(sme.address, "ipfs://meta", "product-x");
  });

  it("should distribute rewards properly", async function () {
    const txnAmt = 1000; // 10% = 100
    const expectedSME = 30;     // 30%
    const expectedCust = 60;    // 60%
    const expectedVerifier = 10;// 10%

    await rewardDist
      .connect(verifier)
      .logAndDistributeReward(1, 0, txnAmt, sme.address, customer.address, verifier.address);

    expect(await ecoCoin.balanceOf(sme.address)).to.equal(expectedSME);
    expect(await ecoCoin.balanceOf(customer.address)).to.equal(expectedCust);
    expect(await ecoCoin.balanceOf(verifier.address)).to.equal(expectedVerifier);
  });

  it("should reject duplicate purchase reward", async () => {
    await rewardDist
      .connect(verifier)
      .logAndDistributeReward(2, 0, 500, sme.address, customer.address, verifier.address);

    await expect(
      rewardDist
        .connect(verifier)
        .logAndDistributeReward(2, 0, 500, sme.address, customer.address, verifier.address)
    ).to.be.revertedWith("Reward already claimed");
  });

  it("should reject unregistered verifier", async () => {
    const [_, __, ___, ____, stranger] = await ethers.getSigners();
    await expect(
      rewardDist
        .connect(stranger)
        .logAndDistributeReward(3, 0, 1000, sme.address, customer.address, stranger.address)
    ).to.be.revertedWith("Unregistered verifier");
  });

  it("should reject invalid NFT", async () => {
    await expect(
      rewardDist
        .connect(verifier)
        .logAndDistributeReward(4, 99, 1000, sme.address, customer.address, verifier.address)
    ).to.be.revertedWith("Invalid NFT");
  });
});
