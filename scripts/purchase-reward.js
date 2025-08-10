const hre = require("hardhat");

async function main() {
  const [deployer, sme, customer, verifier] = await hre.ethers.getSigners();
  console.log("Running as deployer:", deployer.address);

  const EcoCoinAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with actual deployed address
  const ecoCoin = await hre.ethers.getContractAt("EcoCoin", EcoCoinAddress);

  const rewardContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; // your deployed RewardDistribution
  const rewardContract = await hre.ethers.getContractAt("RewardDistribution", rewardContractAddress);

  // Add the verifier if not already added (optional check)
  const tx1 = await rewardContract.addVerifier(verifier.address);
  await tx1.wait();

  const purchaseId = 100;
  const nftId = 0;
  const transactionAmount = 5000;

  console.log("Logging purchase...");

  const balBeforeSME = await ecoCoin.balanceOf(sme.address);
  const balBeforeCustomer = await ecoCoin.balanceOf(customer.address);
  const balBeforeVerifier = await ecoCoin.balanceOf(verifier.address);

  console.log("Before transaction balances:");
  console.log("SME:", balBeforeSME.toString());
  console.log("Customer:", balBeforeCustomer.toString());
  console.log("Verifier:", balBeforeVerifier.toString());

  const tx2 = await rewardContract.logAndDistributeReward(
    purchaseId,
    nftId,
    transactionAmount,
    sme.address,
    customer.address,
    verifier.address
  );
  await tx2.wait();

  const balAfterSME = await ecoCoin.balanceOf(sme.address);
  const balAfterCustomer = await ecoCoin.balanceOf(customer.address);
  const balAfterVerifier = await ecoCoin.balanceOf(verifier.address);

  console.log("After transaction balances:");
  console.log("SME:", balAfterSME.toString());
  console.log("Customer:", balAfterCustomer.toString());
  console.log("Verifier:", balAfterVerifier.toString());

  console.log("✅ Reward distribution successful");
}

main().catch((error) => {
  console.error("❌ Error in purchase-reward.js:", error);
  process.exitCode = 1;
});
