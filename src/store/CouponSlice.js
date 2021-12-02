import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api/index'

export const validateCoupon = createAsyncThunk(
	'coupon/validate',
	async (token, thunkAPI) => {
		try {
			const { data } = await api.validateCoupon(token)
			console.log(data)
			return data
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response.data.message ?? error.message
			)
		}
	}
)

const couponSlice = createSlice({
	name: 'coupon',
	initialState: {
		loading: false,
		success: false,
		couponData: {},
		error: false,
		errorMessage: ''
	},
	reducers: {
		resetState(state) {
			state.loading = false
			state.success = false
			state.couponData = {}
			state.error = false
			state.errorMessage = ''
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(validateCoupon.pending, (state) => {
				state.loading = true
				state.success = false
				state.error = false
				state.couponData = {}
				state.errorMessage = ''
			})
			.addCase(validateCoupon.fulfilled, (state, action) => {
				state.loading = false
				state.success = true
				state.couponData = action.payload
			})
			.addCase(validateCoupon.rejected, (state, action) => {
				state.loading = false
				state.success = false
				state.error = true
				state.errorMessage = action.payload
			})
	}
})
export const { resetState } = couponSlice.actions
export default couponSlice.reducer
