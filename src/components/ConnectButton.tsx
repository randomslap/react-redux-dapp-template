import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { connectWallet } from "../redux/blockchain/blockchainActions"

const ConnectButton: React.FC = () => {
	console.log("rerender")
	const dispatch = useDispatch()
	const account = useSelector(
		(state: { blockchain: any }) => state.blockchain.account
	)

	return (
		<StyledButton
			onClick={(e) => {
				e.preventDefault()
				if (!account) {
					dispatch(connectWallet())
				}
			}}
			disabled={account}
		>
			<StyledText>{account || "Connect your wallet"}</StyledText>
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
