import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import logo from "./logo.svg"
import "./App.css"
import { connectReader } from "./redux/blockchain/blockchainActions"
import ConnectButton from "./components/ConnectButton"
import MintButton from "./components/MintButton"

const App: React.FC = () => {
	const options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

	const dispatch = useDispatch()
	const blockchain: any = useSelector((state: any) => state.blockchain)
	const data: any = useSelector((state: any) => state.data)
	const [amount, setAmount] = useState(1)
	const [address, setAddress] = useState("")
	const [network, setNetwork] = useState("")

	const capitalizeLetter = (string: string) =>
		string.charAt(0).toUpperCase() + string.slice(1)

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) =>
		setAmount(parseInt(event.target.value))

	useEffect(() => {
		const getTotalSupply = async () => {
			if (data.totalSupply === 0) {
				dispatch(connectReader())
			}
		}
		getTotalSupply()
		if (blockchain?.provider?._network?.name) {
			setNetwork(blockchain.provider._network.name)
		}
		if (blockchain?.smartContract?.reader?.address) {
			setAddress(blockchain?.smartContract?.reader?.address)
		}
	}, [
		dispatch,
		data.totalSupply,
		blockchain?.provider?._network?.name,
		blockchain?.smartContract?.reader?.address,
	])

	return (
		<Container>
			<img src={logo} className="App-logo" alt="logo" />
			<h2>
				Network: {!data.loading ? capitalizeLetter(network) : "Loading"}
			</h2>
			<h2>Contract Address: {!data.loading ? address : "Loading"}</h2>
			<h2>
				Minted:{" "}
				{!data.loading
					? `${
							data.tokensMinted === 0
								? 0
								: data.tokensMinted.toNumber()
					  }/${
							data.totalSupply === 0
								? 0
								: data.totalSupply.toNumber()
					  }`
					: "Loading"}
			</h2>
			<ConnectButton loading={data.loading} />
			<SubContainer>
				<StyledSelect value={amount} onChange={handleSelect}>
					{options.map((option, i) => (
						<StyledOption key={i} value={option}>
							{option}
						</StyledOption>
					))}
				</StyledSelect>
				<MintButton amount={amount} loading={data.loading} />
			</SubContainer>
			<h2>
				<a
					target="_blank"
					rel="noreferrer"
					href="https://testnets.opensea.io/collection/sample-testnet"
				>
					Opensea Testnet
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

const StyledSelect = styled.select`
	height: 40px;
	border: none;
	border-radius: 10px;
	outline: none;
	text-align: center;
`

const StyledOption = styled.option``
