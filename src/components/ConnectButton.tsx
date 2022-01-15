import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { fetchData } from "../redux/data/dataActions"
import { connectWallet } from "../redux/blockchain/blockchainActions"

const ConnectButton: React.FC = () => {
	const dispatch = useDispatch()
	const blockchain = useSelector(
		(state: { blockchain: any }) => state.blockchain
	)
	const [walletAddress, setWalletAddress] = useState("")

	useEffect(() => {
		const getData = () => {
			if (
				blockchain.account !== "" &&
				blockchain.smartContract !== null &&
				!walletAddress
			) {
				dispatch(fetchData())
				setWalletAddress(blockchain.account)
			}
		}
		getData()
	}, [blockchain, walletAddress, dispatch])

	return (
		<StyledButton
			onClick={(e) => {
				e.preventDefault()
				if (!walletAddress) {
					dispatch(connectWallet())
				}
			}}
		>
			<StyledText>{walletAddress || "Connect your wallet"}</StyledText>
		</StyledButton>
	)
}

export default ConnectButton

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
