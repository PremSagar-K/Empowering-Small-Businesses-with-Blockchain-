// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract EcoCoin is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("ec", "EC") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        console.log("Balance before minting:");
        console.log(balanceOf(to));

        _mint(to, amount);

        console.log("Balance after minting:");
        console.log(balanceOf(to));
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount > 0, "Amount must be greater than 0");
        return super.transfer(recipient, amount);
    }
}
