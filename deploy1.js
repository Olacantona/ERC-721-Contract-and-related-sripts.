

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying the contract with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");

  // Deploy the contract and wait for it to be deployed
  const myToken = await MyToken.deploy();

  console.log("Waiting for the contract to be deployed...");
  await myToken.waitForDeployment();

  // Get the contract address after deployment
  const contractAddress = await myToken.getAddress();

  console.log("MyToken deployed to:", contractAddress);
  console.log("Minting 1,000,000 tokens to the deployer account...");

  console.log("Deployment successful! 1,000,000 tokens minted to:", deployer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

