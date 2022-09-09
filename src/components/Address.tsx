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
				href="https://rinkeby.etherscan.io/address/0x2b3a7e96033042eC05C44E1eef5aef30FF99fE62"
			>
				{address || "Loading"}
			</a>
		</h2>
	)
}

export default Address
