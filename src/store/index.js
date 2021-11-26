import { configureStore } from '@reduxjs/toolkit'
import couponReducer from './CouponSlice'
const store = configureStore({
	reducer: {
		coupon: couponReducer
	}
})

export default store
