// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const message = "Hello world !!!!"
    let pbv
    let gold
    let tokenSale
    let reserve
    let marketplace
    let defaulFeeRate = 0
    let defaulFeeDecimal = 0

    const Pbv = await ethers.getContractFactory('Pbv')
    pbv = await Pbv.deploy()
    await pbv.deployed()
    console.log("PBV deployed to:", pbv.address);

    const Gold = await ethers.getContractFactory('Gold')
    gold = await Gold.deploy()
    await gold.deployed()
    console.log("Gold deployed to:", gold.address);

    const TokenSale = await ethers.getContractFactory("TokenSale")
    tokenSale = await TokenSale.deploy(gold.address)
    await tokenSale.deployed()
    const transferTx = await gold.transfer(tokenSale.address, ethers.utils.parseUnits("1000000", "ether"))
    await transferTx.wait()
    console.log("tokenSale deployed to:", tokenSale.address);
  

    const Reserve = await ethers.getContractFactory('Reserve')
    reserve = await Reserve.deploy(gold.address)
    await reserve.deployed()
    console.log("reserve deployed to:", reserve.address);

    const Marketplace = await ethers.getContractFactory("Marketplace");
    marketplace = await Marketplace.deploy(pbv.address, defaulFeeDecimal, defaulFeeRate, reserve.address)
    await marketplace.deployed()
    console.log("Marketplace deployed to:", marketplace.address);
  
    const addPaymentTx = await marketplace.addPaymentToken(gold.address)
    await addPaymentTx.wait()
  
    console.log("Gold is payment token? true or false:", await marketplace.isPaymentTokenSupported(gold.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
