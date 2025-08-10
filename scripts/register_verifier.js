const hre = require("hardhat");

async function main() {
  const [deployer, sme, verifier] = await hre.ethers.getSigners();

  const rewardDistribution = await hre.ethers.getContractAt(
    "RewardDistribution",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // new rewardDistribution address
  );

  await rewardDistribution.addVerifier(verifier.address);

  console.log("Registered Verifier:", verifier.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
