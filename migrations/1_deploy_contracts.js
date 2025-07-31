const fs = require("fs");
const path = require("path");
const TokenStorage = artifacts.require("TokenStorage");

module.exports = async function (deployer) {
  await deployer.deploy(TokenStorage);
  const deployedInstance = await TokenStorage.deployed();

  const contractInfo = {
    address: deployedInstance.address,
    abi: TokenStorage.abi
  };

  const outputPath = path.resolve(__dirname, "../contract-info.json");
  fs.writeFileSync(outputPath, JSON.stringify(contractInfo, null, 2));

  console.log("✅ Contract deployed and ABI/address saved to contract-info.json");
};
