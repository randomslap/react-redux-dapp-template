// Libraries
import React, { useState, useEffect, useCallback } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

// Assets
import logo from "./logo.svg"
import "./App.css"

// Actions
import { connectReader } from "./redux/blockchain/blockchainActions"

// Components
import ConnectButton from "./components/ConnectButton"
import MintButton from "./components/MintButton"
import Supply from "./components/Supply"
import Address from "./components/Address"
import Network from "./components/Network"
import Selector from "./components/Selector"

const MintSection: React.FC = () => {
	const [amount, setAmount] = useState(1)
	const handleSelect = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) =>
			setAmount(parseInt(event.target.value)),
		[]
	)
	return (
		<SubContainer>
			<Selector amount={amount} handleSelect={handleSelect} />
			<MintButton amount={amount} />
		</SubContainer>
	)
}

const App: React.FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(connectReader())
	}, [dispatch])

	useEffect(() => {
		alert(
			"Due to recent changes to Alchemy's testnet, this site is currently broken. Please check back later for an update."
		)
	}, [])

	return (
		<Container>
			<img src={logo} className="App-logo" alt="logo" />
			<Network />
			<Address />
			<Supply />
			<ConnectButton />
			<MintSection />
			<h2>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://testnets.opensea.io/collection/sample-testnet"
				>
					Opensea Testnet
				</a>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://github.com/randomslap/react-redux-dapp-template"
				>
					GitHub Repository
				</a>
			</h2>
		</Container>
	)
}

export default App

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
`

const SubContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`
