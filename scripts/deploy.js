const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy EcoCoin
  const EcoCoin = await hre.ethers.getContractFactory("EcoCoin");
  const ecoCoin = await EcoCoin.deploy(0); // initialSupply = 0
  await ecoCoin.waitForDeployment(); // ✅ ✅ replaces .deployed()

  // Deploy EcoNFT
  const EcoNFT = await hre.ethers.getContractFactory("EcoNFT");
  const ecoNFT = await EcoNFT.deploy(deployer.address); // admin or SME
  await ecoNFT.waitForDeployment(); // ✅ ✅

  // Deploy RewardDistribution
  const RewardDistribution = await hre.ethers.getContractFactory("RewardDistribution");
  const rewardDistribution = await RewardDistribution.deploy(
    await ecoCoin.getAddress(),
    await ecoNFT.getAddress()
  );
  await rewardDistribution.waitForDeployment(); // ✅ ✅

  // Transfer EcoCoin ownership to RewardDistribution
  await ecoCoin.transferOwnership(await rewardDistribution.getAddress());

  console.log("EcoCoin deployed to:", await ecoCoin.getAddress());
  console.log("EcoNFT deployed to:", await ecoNFT.getAddress());
  console.log("RewardDistribution deployed to:", await rewardDistribution.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
