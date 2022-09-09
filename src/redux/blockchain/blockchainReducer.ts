import { Action } from "../../types"

const initialState = {
	loading: false,
	account: null,
	smartContract: null,
	provider: null,
	errorMsg: "",
	web3: null,
}

const blockchainReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case "CONNECTION_REQUEST":
			return {
				...initialState,
				...state,
				loading: true,
			}
		case "CONNECTION_SUCCESS":
			return {
				...state,
				loading: false,
				account: action.payload.account,
				smartContract: action.payload.smartContract,
				provider: action.payload.provider,
				web3: action.payload.web3,
			}
		case "CONNECTION_FAILED":
			return {
				...initialState,
				...state,
				loading: false,
				errorMsg: action.payload,
			}
		case "UPDATE_ACCOUNT":
			return {
				...state,
				account: action.payload.account,
			}
		default:
			return state
	}
}

export default blockchainReducer
