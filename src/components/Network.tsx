import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const Network: React.FC = () => {
	const networkId: any = useSelector(
		(state: any) => state.blockchain?.smartContract?.networkId
	)
	const [network, setNetwork] = useState("")

	const capitalizeLetter = (string: string) =>
		string.charAt(0).toUpperCase() + string.slice(1)

	useEffect(() => {
		if (networkId) {
			switch (networkId) {
				case 1:
					setNetwork("Mainnet")
					break
				case 3:
					setNetwork("Ropsten")
					break
				case 4:
					setNetwork("Rinkeby")
					break
				case 5:
					setNetwork("Goerli")
					break
				case 11155111:
					setNetwork("Sepolia")
					break
				default:
					setNetwork("Unknown")
			}
		}
	}, [networkId])
	return <h2>Network: {capitalizeLetter(network) || "Loading"}</h2>
}

export default Network
