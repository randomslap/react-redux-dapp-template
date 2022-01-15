import dotenv from "dotenv"
import { task } from "hardhat/config"
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-etherscan"

dotenv.config()

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
				enabled: false,
				runs: 200,
			},
		},
	},
	defaultNetwork: "rinkeby",
	networks: {
		rinkeby: {
			url: process.env.RPC_URL,
			accounts: [process.env.PRIV_KEY],
		},
	},
	hardhat: {
		chainId: 4,
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
}

export default config
