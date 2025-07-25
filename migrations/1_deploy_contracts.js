/* 1_deploy_contract.js */
const TokenStorage = artifacts.require("TokenStorage");

module.exports = function (deployer) {
  deployer.deploy(TokenStorage);
};