import axios from 'axios'

const validateCoupon = (qrCode) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'UXmU6I99Cyt3J3Q8NIjE'
		}
	}
	return axios.get(
		`https://xmas-coupon.herokuapp.com/api/xms/users/coupons/${qrCode}`
	)
}

export default {
	validateCoupon
}
