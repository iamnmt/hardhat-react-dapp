async function main() {
  if (network.name === "rinkeby") {
    console.warn("Deploying FundMe to Rinkeby testnet");
  }

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const FundMe = await ethers.getContractFactory("FundMe");
  const fundMe = await FundMe.deploy();
  await fundMe.deployed();

  console.log("FundMe address:", fundMe.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
