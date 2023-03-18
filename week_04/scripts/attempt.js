
const hre = require("hardhat");
const proxyAddress = process.env.PROXY_CONTRACT_ADDRESS;

async function main(){
    const [caller] = await hre.ethers.getSigners();
    const ProxyContract = await hre.ethers.getContractFactory("ProxyContract");
    const proxyContract = ProxyContract.attach(proxyAddress);

    await proxyContract.callToWin();
    console.log("Fired a call from address ", proxyAddress);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  