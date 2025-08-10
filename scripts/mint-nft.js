const { ethers } = require("hardhat");
const { Interface } = require("ethers"); // Ethers v6-compatible

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Minting NFT with deployer:", deployer.address);

    const ecoNFTAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"; // Replace with actual address
    const ecoNFT = await ethers.getContractAt("EcoNFT", ecoNFTAddress);

    const recipient = deployer.address;
    const metadataURI = "https://ipfs.io/ipfs/QmExampleHash"; // Replace with actual IPFS URI
    const productId = "PROD-003"; // Ensure it's unused

    const tx = await ecoNFT.mintNFT(recipient, metadataURI, productId);
    const receipt = await tx.wait();

    console.log("Full receipt:", receipt); // Debug log

    const iface = new Interface([
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
    ]);

    for (const log of receipt.logs) {
        try {
            const parsed = iface.parseLog(log);
            if (parsed.name === "Transfer") {
                const tokenId = parsed.args.tokenId.toString();
                console.log(`✅ NFT minted successfully! Token ID: ${tokenId}`);
                return;
            }
        } catch (_) {
            // Non-matching log, skip
        }
    }

    console.warn("⚠️ NFT mint transaction completed, but no Transfer event found in logs.");
}

main().catch((error) => {
    console.error("❌ Error minting NFT:", error);
    process.exitCode = 1;
});
