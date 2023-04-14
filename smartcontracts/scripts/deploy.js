const hre = require("hardhat");
const { ethers } = require('hardhat');


async function main() {
  [owner, acc1, acc2] = await ethers.getSigners();
  const Heritage = await hre.ethers.getContractFactory("Heritage");
  const heritage = await Heritage.deploy();

  await heritage.deployed();

  const TestContract = await ethers.getContractFactory("TestContract")

  let testContract = await TestContract.deploy();
  await testContract.deployed();


  console.log(
    `Heritage deployed to ${heritage.address}`
  );
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
