import { ethers } from "ethers"

import { fetchData } from "../data/dataActions"
import contract from "../../artifacts/contracts/Sample.sol/Sample.json"

const address: string = `${process.env.REACT_APP_CONTRACT_ADDRESS}`

declare global {
	interface Window {
		ethereum: any
	}
}

let provider: ethers.providers.Web3Provider
let reader: ethers.Contract
if (typeof window.ethereum !== "undefined") {
	provider = new ethers.providers.Web3Provider(window.ethereum)
	reader = new ethers.Contract(address, contract.abi, provider)
}

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
		dispatch(connectRequest())
		const SmartContractObj: any = {
			reader,
		}
		SmartContractObj.interface = SmartContractObj.reader.interface
		dispatch(
			connectSuccess({
				smartContract: SmartContractObj,
				provider,
			})
		)
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
		if (metamaskIsInstalled && provider) {
			try {
				const accounts = await ethereum.request({
					method: "eth_requestAccounts",
				})
				const networkId = await ethereum.request({
					method: "net_version",
				})
				if (networkId === CONFIG.NETWORK.ID.toString()) {
					console.log("Success")
					const signer = provider.getSigner()
					const SmartContractObj: any = {
						reader,
						signer: new ethers.Contract(
							CONFIG.CONTRACT_ADDRESS,
							contract.abi,
							signer
						),
					}
					SmartContractObj.interface =
						SmartContractObj.reader.interface
					dispatch(
						connectSuccess({
							account: accounts[0],
							smartContract: SmartContractObj,
							provider,
						})
					)
					// Add listeners start
					ethereum.on("accountsChanged", (accounts: object[]) => {
						dispatch(updateAccount(accounts[0]))
					})
					ethereum.on("chainChanged", () => {
						window.location.reload()
					})
					// Add listeners end
				} else {
					console.log("Failed")
					dispatch(
						connectFailed(
							`Change network to ${CONFIG.NETWORK.NAME}.`
						)
					)
					alert(
						`Please set the Metamask Network to ${CONFIG.NETWORK.NAME}`
					)
				}
			} catch (err) {
				console.log(err)
				dispatch(connectFailed("Something went wrong."))
			}
		} else {
			dispatch(connectFailed("Install Metamask."))
			alert("Please install Metamask.")
		}
	}
}

export const updateAccount = (account: any) => {
	return async (dispatch: any) => {
		dispatch(updateAccountRequest({ account: account }))
		dispatch(fetchData())
	}
}
