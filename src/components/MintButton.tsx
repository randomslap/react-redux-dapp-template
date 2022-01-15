import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { fetchData } from "../redux/data/dataActions"
import { connectWallet } from "../redux/blockchain/blockchainActions"

const MintButton: React.FC<{ amount: number }> = ({ amount }) => {
	const dispatch = useDispatch()
	const blockchain: any = useSelector((state: any) => state.blockchain)
	const data: any = useSelector((state: any) => state.data)

	const [CONFIG, SET_CONFIG] = useState({
		CONTRACT_ADDRESS: "",
		SCAN_LINK: "",
		NETWORK: {
			NAME: "",
			SYMBOL: "",
			ID: 0,
		},
		NFT_NAME: "",
		SYMBOL: "",
		MAX_SUPPLY: 1,
		WEI_COST: 0,
		DISPLAY_COST: 0,
		GAS_LIMIT: 0,
		MARKETPLACE: "",
		MARKETPLACE_LINK: "",
		SHOW_BACKGROUND: false,
	})

	const getData = () => {
		if (blockchain.account !== "" && blockchain.smartContract !== null) {
			dispatch(fetchData())
		}
	}

	const getConfig = async () => {
		const configResponse = await fetch("/config/config.json", {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
		const config = await configResponse.json()
		SET_CONFIG(config)
	}

	const mint = async () => {
		try {
			if (!data.salePaused && blockchain.account) {
				let cost = CONFIG.WEI_COST
				let gasLimit = CONFIG.GAS_LIMIT
				let totalCostWei = String(cost * amount)
				let totalGasLimit = String(gasLimit * amount)
				const transaction = await blockchain.smartContract.signer.mint(
					amount,
					{
						value: totalCostWei,
						gasLimit: totalGasLimit,
					}
				)
				await transaction.wait()
				const txReceipt =
					await blockchain.provider.getTransactionReceipt(
						transaction.hash
					)
				const purchasedIds = txReceipt.logs
					.map((log: any) =>
						blockchain.smartContract.interface.parseLog(log)
					)
					.filter((log: any) => log.name === "Transfer")
					.map((log: any) => log.args.tokenId.toNumber())
				console.log(purchasedIds)
				alert(`Purchased ${purchasedIds.length} token(s)`)
				getData()
			} else if (!blockchain.account) {
				dispatch(connectWallet())
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		getConfig()
	}, [])

	return (
		<StyledButton
			onClick={(e) => {
				e.preventDefault()
				mint()
			}}
		>
			<StyledText>Mint </StyledText>
		</StyledButton>
	)
}

export default MintButton

const StyledButton = styled.button`
	border-radius: 10px;
	border: none;
	text-align: center;
	text-decoration: none;
	font-size: 12px;
	background-color: #61dbfb;
	padding: 7px 24px;
	margin: 10px;
`

const StyledText = styled.h3`
	color: white;
`
