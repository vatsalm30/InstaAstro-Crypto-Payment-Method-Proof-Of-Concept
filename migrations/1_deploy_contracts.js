var NFTCollection = artifacts.require("./NFTCollection.sol");
var Market = artifacts.require("./Market.sol");
var SaleTokens = artifacts.require("./SaleTokens.sol");

module.exports = function(deployer) {
  deployer.deploy(NFTCollection,"URI HERE","TOKEN NAME","SYMBOL");
  deployer.deploy(Market);
  deployer.deploy(SaleTokens);
};
