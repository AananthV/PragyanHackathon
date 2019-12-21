const DigitalSignature = artifacts.require("DigitalSignature");

module.exports = function (deployer) {
    deployer.deploy(DigitalSignature);
};
