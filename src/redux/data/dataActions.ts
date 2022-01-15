import store from "../store"

const fetchDataRequest = () => {
	return {
		type: "CHECK_DATA_REQUEST",
	}
}

const fetchDataSuccess = (payload: any) => {
	return {
		type: "CHECK_DATA_SUCCESS",
		payload: payload,
	}
}

const fetchDataFailed = (payload: any) => {
	return {
		type: "CHECK_DATA_FAILED",
		payload: payload,
	}
}

export const fetchData = () => {
	return async (dispatch: any) => {
		dispatch(fetchDataRequest())
		try {
			const state = store.getState()
			let totalSupply =
				await state.blockchain.smartContract.reader.total_supply()
			let salePaused =
				await state.blockchain.smartContract.reader.paused_sale()
			let tokensMinted =
				await state.blockchain.smartContract.reader.tokensMinted()
			dispatch(
				fetchDataSuccess({
					totalSupply,
					salePaused,
					tokensMinted,
				})
			)
		} catch (err) {
			console.log(err)
			dispatch(fetchDataFailed("Could not load data from contract."))
		}
	}
}
