import React from "react"
import { useSelector } from "react-redux"

const Address: React.FC = () => {
	const address: any = useSelector(
		(state: any) => state.blockchain?.smartContract?._address
	)
	return (
		<h2>
			Contract Address:{" "}
			<a
				target="_blank"
				rel="noreferrer"
				href="https://sepolia.etherscan.io/address/0x7BC456ce8965B982982D06961422f643dE5936d8"
			>
				{address || "Loading"}
			</a>
		</h2>
	)
}

export default Address
