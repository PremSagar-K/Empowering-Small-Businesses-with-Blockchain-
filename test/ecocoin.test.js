const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EcoCoin", function () {
  let EcoCoin, ecoCoin, deployer, addr1;

  beforeEach(async function () {
    [deployer, addr1] = await ethers.getSigners();
    const initialSupply = 1000;
    EcoCoin = await ethers.getContractFactory("EcoCoin");
    ecoCoin = await EcoCoin.deploy(initialSupply);
    await ecoCoin.waitForDeployment();
  });

  it("Should assign the total supply to the deployer", async function () {
    const deployerBalance = await ecoCoin.balanceOf(deployer.address);
    const totalSupply = await ecoCoin.totalSupply();
    expect(deployerBalance).to.equal(totalSupply);
  });

  it("Should mint tokens correctly", async function () {
    await ecoCoin.mint(addr1.address, 100);
    const balance = await ecoCoin.balanceOf(addr1.address);
    expect(balance).to.equal(100);
  });

  it("Should transfer tokens between accounts", async function () {
    await ecoCoin.transfer(addr1.address, 50);
    const balance = await ecoCoin.balanceOf(addr1.address);
    expect(balance).to.equal(50);
  });
});
