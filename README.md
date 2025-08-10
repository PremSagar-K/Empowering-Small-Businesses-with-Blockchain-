# EcoChain PoA - Empowering Small Businesses with Blockchain

A blockchain-based ecosystem that empowers small and medium enterprises (SMEs) by incentivizing eco-friendly purchases through cryptocurrency rewards and NFT certificates.

## 🌟 Overview

EcoChain PoA is a comprehensive blockchain solution built on Ethereum that promotes sustainable business practices by:
- Rewarding customers for eco-friendly purchases with EcoCoins (ERC20 tokens)
- Issuing NFT certificates for verified sustainable transactions
- Creating a transparent reward distribution system involving SMEs, customers, and verifiers

## 🏗️ Smart Contract Architecture

### 1. EcoCoin.sol
- **Type**: ERC20 Token Contract
- **Purpose**: Native cryptocurrency for the ecosystem
- **Features**: 
  - Mintable tokens for reward distribution
  - Owner-controlled minting
  - Standard ERC20 functionality

### 2. EcoNFT.sol
- **Type**: ERC721 NFT Contract
- **Purpose**: Digital certificates for eco-friendly purchases
- **Features**:
  - Unique NFTs for each verified transaction
  - Metadata storage for purchase details
  - Owner-controlled minting

### 3. RewardDistribution.sol
- **Type**: Core Business Logic Contract
- **Purpose**: Manages the entire reward ecosystem
- **Features**:
  - Verifier management system
  - Automated reward distribution (70% customer, 20% SME, 10% verifier)
  - Purchase logging and tracking
  - Integration with EcoCoin and EcoNFT contracts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- Hardhat development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PremSagar-K/Empowering-Small-Businesses-with-Blockchain-.git
cd Empowering-Small-Businesses-with-Blockchain-
```

2. Install dependencies:
```bash
npm install
```

3. Compile contracts:
```bash
npx hardhat compile
```

### Deployment

1. Start local Hardhat network:
```bash
npx hardhat node
```

2. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 📜 Available Scripts

### Core Scripts
- `scripts/deploy.js` - Deploy all contracts to the network
- `scripts/mint-nft.js` - Mint NFT certificates for verified purchases
- `scripts/purchase-reward.js` - Log purchases and distribute rewards
- `scripts/register_verifier.js` - Register new verifiers in the system

### Testing
- `test/ecocoin.test.js` - EcoCoin contract tests
- `test/econft.test.js` - EcoNFT contract tests
- `test/rewarddistribution.test.js` - RewardDistribution contract tests

Run tests:
```bash
npx hardhat test
```

## 🔄 Workflow

1. **Setup**: Deploy contracts and register verifiers
2. **Purchase**: Customer makes an eco-friendly purchase at an SME
3. **Verification**: Verifier validates the eco-friendly nature of the purchase
4. **Reward Distribution**: System automatically distributes EcoCoins:
   - 70% to customer (incentive for eco-friendly choices)
   - 20% to SME (incentive for sustainable practices)
   - 10% to verifier (compensation for verification service)
5. **NFT Certificate**: Issue unique NFT as proof of sustainable purchase

## 💰 Token Economics

- **Total Supply**: Unlimited (mintable by owner)
- **Reward Distribution**: 
  - Customer: 70% of transaction-based rewards
  - SME: 20% of transaction-based rewards
  - Verifier: 10% of transaction-based rewards

## 🛡️ Security Features

- Owner-controlled minting and critical functions
- Verifier whitelist system
- Event logging for transparency
- Access control for sensitive operations

## 🧪 Testing

The project includes comprehensive test suites covering:
- Token minting and transfers
- NFT creation and metadata
- Reward distribution logic
- Access control mechanisms
- Edge cases and error handling

## 📊 Contract Addresses (Local Network)

Update these addresses after deployment:
- EcoCoin: `[Your deployed EcoCoin address]`
- EcoNFT: `[Your deployed EcoNFT address]`
- RewardDistribution: `[Your deployed RewardDistribution address]`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- Integration with real-world IoT devices for automatic verification
- Cross-chain compatibility
- Mobile app for customer interactions
- Advanced analytics dashboard
- Governance token for community decision-making

## 📧 Contact

For questions or collaborations, please reach out through GitHub issues or discussions.

---

*Building a sustainable future, one transaction at a time.* 🌱
