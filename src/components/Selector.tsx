import React, { memo } from "react"
import styled from "styled-components"

const Selector: React.FC<{
	amount: number
	handleSelect: (event: any) => void
}> = ({ amount, handleSelect }) => {
	const options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	return (
		<StyledSelect value={amount} onChange={handleSelect}>
			{options.map((option, i) => (
				<option key={i} value={option}>
					{option}
				</option>
			))}
		</StyledSelect>
	)
}

export default memo(Selector)

const StyledSelect = styled.select`
	height: 40px;
	border: none;
	border-radius: 10px;
	outline: none;
	text-align: center;
`
