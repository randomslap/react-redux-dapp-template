import { Action } from "../../types"

const initialState = {
	loading: true,
	totalSupply: 0,
	cost: 0,
	salePaused: true,
	tokensMinted: 0,
	error: false,
	errorMsg: "",
}

const dataReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case "CHECK_DATA_REQUEST":
			return {
				...state,
				loading: true,
				error: false,
				errorMsg: "",
			}
		case "CHECK_DATA_SUCCESS":
			return {
				...state,
				loading: false,
				totalSupply: action.payload.totalSupply,
				salePaused: action.payload.salePaused,
				tokensMinted: action.payload.tokensMinted,
				error: false,
				errorMsg: "",
			}
		case "CHECK_DATA_FAILED":
			return {
				...initialState,
				loading: false,
				error: true,
				errorMsg: action.payload,
			}
		default:
			return state
	}
}

export default dataReducer
