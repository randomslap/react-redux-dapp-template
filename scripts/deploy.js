const hre = require("hardhat")

async function main() {
	const Sample = await hre.ethers.getContractFactory("Sample")
	const sample = await Sample.deploy("Sample", "SAMP", 10000)

	await sample.deployed()

	console.log("SAMP deployed to:", sample.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
