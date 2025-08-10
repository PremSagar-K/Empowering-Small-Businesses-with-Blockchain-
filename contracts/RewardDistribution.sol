// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IEcoCoin {
    function mint(address to, uint256 amount) external;
}

interface IEcoNFT {
    function isValid(uint256 tokenId) external view returns (bool);
}

contract RewardDistribution {
    address public admin;
    IEcoCoin public ecoCoin;
    IEcoNFT public ecoNFT;

    // Track processed purchases to avoid double rewards
    mapping(uint256 => bool) public rewardedPurchases;

    event RewardDistributed(
        uint256 indexed purchaseId,
        uint256 nftId,
        address sme,
        address customer,
        address verifier,
        uint256 totalEcoCoins
    );

    constructor(address _ecoCoin, address _ecoNFT) {
        admin = msg.sender;
        ecoCoin = IEcoCoin(_ecoCoin);
        ecoNFT = IEcoNFT(_ecoNFT);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call");
        _;
    }

    function updateAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }

    mapping(address => bool) public isVerifier;

    function addVerifier(address verifier) public onlyAdmin {
        require(verifier != address(0), "Invalid verifier address");
        isVerifier[verifier] = true;
    }

    function logAndDistributeReward(
        uint256 purchaseId,
        uint256 nftId,
        uint256 transactionAmount,
        address sme,
        address customer,
        address verifier
    ) external {
        require(!rewardedPurchases[purchaseId], "Reward already claimed");
        require(ecoNFT.isValid(nftId), "Invalid NFT");
        require(transactionAmount > 0, "Transaction amount must be positive");
        require(isVerifier[verifier], "Unregistered verifier");

        uint256 totalReward = (transactionAmount * 10) / 100;
        uint256 smeShare = (totalReward * 30) / 100;
        uint256 customerShare = (totalReward * 60) / 100;
        uint256 verifierShare = totalReward - smeShare - customerShare;

        ecoCoin.mint(sme, smeShare);
        ecoCoin.mint(customer, customerShare);
        ecoCoin.mint(verifier, verifierShare);

        rewardedPurchases[purchaseId] = true;

        emit RewardDistributed(
            purchaseId,
            nftId,
            sme,
            customer,
            verifier,
            totalReward
        );
    }
}
