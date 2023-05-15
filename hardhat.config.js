require("dotenv").config()
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
const { task } = require("hardhat/config")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners()

	for (const account of accounts) {
		console.log(account.address)
	}
})

const config = {
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
	defaultNetwork: "sepolia",
	networks: {
		sepolia: {
			url: process.env.RPC_URL,
			accounts: [process.env.PRIV_KEY],
		},
	},
	hardhat: {
		chainId: 11155111,
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
}

module.exports = config
