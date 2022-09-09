// constants
import { createAlchemyWeb3 } from "@alch/alchemy-web3"

// log
import { fetchData } from "../data/dataActions"

import contract from "../../artifacts/contracts/Sample.sol/Sample.json"

const address: string = `${process.env.REACT_APP_CONTRACT_ADDRESS}`
const abi: any = contract.abi

declare global {
	interface Window {
		ethereum: any
	}
}

let web3 = createAlchemyWeb3(process.env.REACT_APP_RPC_URL || "")

const connectRequest = () => {
	return {
		type: "CONNECTION_REQUEST",
	}
}

const connectSuccess = (payload: any) => {
	return {
		type: "CONNECTION_SUCCESS",
		payload: payload,
	}
}

const connectFailed = (payload: any) => {
	return {
		type: "CONNECTION_FAILED",
		payload: payload,
	}
}

const updateAccountRequest = (payload: any) => {
	return {
		type: "UPDATE_ACCOUNT",
		payload: payload,
	}
}

export const connectReader = () => {
	return async (dispatch: any) => {
		try {
			dispatch(connectRequest())
			const { ethereum } = window
			const metamaskIsInstalled = ethereum && ethereum.isMetaMask
			if (metamaskIsInstalled) {
				const networkId = await ethereum.request({
					method: "net_version",
				})
				const SmartContractObj = new web3.eth.Contract(abi, address)
				dispatch(
					connectSuccess({
						smartContract: {
							...SmartContractObj,
							networkId: parseInt(networkId),
						},
						web3: web3,
					})
				)
				dispatch(fetchData())
			} else {
				alert("Install Metamask.")
				dispatch(connectFailed("Install Metamask."))
			}
		} catch (err) {
			alert("Error Something went wrong.")
			dispatch(connectFailed("Something went wrong."))
		}
	}
}

export const connectWallet = () => {
	return async (dispatch: any) => {
		dispatch(connectRequest())
		const configResponse = await fetch("/config/config.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
		const CONFIG = await configResponse.json()
		const { ethereum } = window
		const metamaskIsInstalled = ethereum && ethereum.isMetaMask
		if (metamaskIsInstalled) {
			try {
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				})
				const networkId = await ethereum.request({
					method: "net_version",
				})
				if (parseInt(networkId) === CONFIG.NETWORK.ID) {
					const SmartContractObj = new web3.eth.Contract(abi, address)
					dispatch(
						connectSuccess({
							account: accounts[0],
							smartContract: {
								...SmartContractObj,
								networkId: parseInt(networkId),
							},
							web3: web3,
						})
					)
					// Add listeners start
					ethereum.on("accountsChanged", (accounts: [number]) => {
						dispatch(updateAccount(accounts[0]))
					})
					ethereum.on("chainChanged", () => {
						window.location.reload()
					})
					// Add listeners end
				} else {
					alert("Please change network to Rinkeby")
					dispatch(
						connectFailed(
							`Change network to ${CONFIG.NETWORK.NAME}.`
						)
					)
				}
			} catch (err) {
				console.log(err)
				alert("Something went wrong.")
				dispatch(connectFailed("Something went wrong."))
			}
		} else {
			alert("Install Metamask.")
			dispatch(connectFailed("Install Metamask."))
		}
	}
}

export const updateAccount = (account: any) => {
	return async (dispatch: any) => {
		dispatch(updateAccountRequest({ account: account }))
		dispatch(fetchData())
	}
}
