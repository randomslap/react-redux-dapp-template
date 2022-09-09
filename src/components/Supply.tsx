import React from "react"
import { useSelector } from "react-redux"

const Supply: React.FC = () => {
	const data: any = useSelector((state: any) => state.data)

	return (
		<h2>
			Minted:{" "}
			{data.totalSupply > 0
				? `${data.tokensMinted === 0 ? 0 : data.tokensMinted}/${
						data.totalSupply === 0 ? 0 : data.totalSupply
				  }`
				: "Loading"}
		</h2>
	)
}

export default Supply
