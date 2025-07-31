require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY ;

module.exports = {
  solidity: "0.8.27",
  networks: {
    morphHolesky: {
  url: "https://rpc-quicknode-holesky.morphl2.io",
  chainId: 2810,
  accounts: [process.env.PRIVATE_KEY], // Your wallet's private key
},
    
   
    
  }
};
