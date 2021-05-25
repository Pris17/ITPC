const ManufacturerRole = artifacts.require("./ManufacturerRole.sol");
const DealerRole = artifacts.require("./DealerRole.sol");
const CustomerRole = artifacts.require("./CustomerRole.sol");
const AutoSC = artifacts.require("./AutoSC.sol");

module.exports = function(deployer) {
  deployer.deploy(ManufacturerRole);
  deployer.deploy(DealerRole);
  deployer.deploy(CustomerRole);
  deployer.deploy(AutoSC);
};