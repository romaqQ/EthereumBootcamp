require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require("@nomicfoundation/hardhat-chai-matchers");

const privateKey = process.env.PRIVATE_KEY;
const alchemyUrl = process.env.ALCHEMY_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url:alchemyUrl,
      accounts: [privateKey]
    }
  }
};
