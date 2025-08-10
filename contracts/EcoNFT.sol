// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EcoNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    mapping(string => bool) private _productMinted;
    bool private _constructing = true;

    constructor(address initialOwner) ERC721("EcoNFT", "ENFT") {
        transferOwnership(initialOwner);
        _constructing = false;
    }

    function transferOwnership(address newOwner) public override {
        require(_constructing, "Ownership transfer is disabled for soulbound contract");
        super.transferOwnership(newOwner);
    }

    function renounceOwnership() public pure override {
        revert("Renouncing ownership is disabled for soulbound contract");
    }

    function mintNFT(address to, string memory metadataURI, string memory productId)
        external onlyOwner returns (uint256)
    {
        require(!_productMinted[productId], "NFT for this product already minted");

        uint256 tokenId = _tokenIdCounter;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        _productMinted[productId] = true;
        _tokenIdCounter++;

        return tokenId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        require(from == address(0) || to == address(0), "This token is soulbound and cannot be transferred");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function isValid(uint256 tokenId) external view returns (bool) {
        return _exists(tokenId);
    }

    function getProductDetails(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "NFT does not exist");
        return tokenURI(tokenId);
    }
}
