const { expect } = require("chai");

describe("EcoNFT", function () {
  let EcoNFT, ecoNFT, owner, user;

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();
    EcoNFT = await ethers.getContractFactory("EcoNFT");
    ecoNFT = await EcoNFT.deploy(owner.address);
    await ecoNFT.waitForDeployment();
  });

  it("should mint a unique soulbound NFT", async function () {
    const tx = await ecoNFT.connect(owner).mintNFT(user.address, "ipfs://meta", "product-123");
    const receipt = await tx.wait();
    const tokenId = 0; // First minted token will be 0
    expect(await ecoNFT.ownerOf(tokenId)).to.equal(user.address);
    expect(await ecoNFT.ownerOf(tokenId)).to.equal(user.address);
    expect(await ecoNFT.getProductDetails(tokenId)).to.equal("ipfs://meta");
  });

  it("should not allow minting duplicate productId", async function () {
    await ecoNFT.connect(owner).mintNFT(user.address, "ipfs://meta", "dup-product");
    await expect(
      ecoNFT.connect(owner).mintNFT(user.address, "ipfs://meta2", "dup-product")
    ).to.be.revertedWith("NFT for this product already minted");
  });

  it("should prevent transfers (soulbound)", async function () {
    await ecoNFT.connect(owner).mintNFT(user.address, "ipfs://meta", "p3");
    await expect(
      ecoNFT.connect(user).transferFrom(user.address, owner.address, 0)
    ).to.be.revertedWith("This token is soulbound and cannot be transferred");
  });

  it("should validate existing tokenId", async function () {
    await ecoNFT.connect(owner).mintNFT(user.address, "ipfs://meta", "p4");
    expect(await ecoNFT.isValid(0)).to.equal(true);
  });

  it("should reject non-existent tokenId in getProductDetails", async function () {
    await expect(ecoNFT.getProductDetails(42)).to.be.revertedWith("NFT does not exist");
  });
});
