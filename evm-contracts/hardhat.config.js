require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Ensure your .env file has the PRIVATE_KEY variable set
const PRIVATE_KEY = 0x47C20dD1a64F91c0A3590f98266DEABE3536b0A4;

if (!PRIVATE_KEY) {
  console.error("Please set your PRIVATE_KEY in a .env file");
  process.exit(1);
}

module.exports = {
  solidity: "0.8.23",
  networks: {
    // for testnet
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [PRIVATE_KEY ],
      gasPrice: 1000000000,
    },
  },

};
