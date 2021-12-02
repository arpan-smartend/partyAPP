import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react'
import {
	View,
	Vibration,
	StyleSheet,
	Alert,
	Text,
	Image,
	ImageBackground
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '../components/UI/Button'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Modal from '../components/UI/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { validateCoupon, resetState } from '../store/CouponSlice'

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const { couponData, errorMessage, error, success } = useSelector(
		(state) => state.coupon
	)
	const [modalVisible, setModalVisible] = useState(false)
	const [hasPermission, setHasPermission] = useState(null)
	const [headerTitle, setHeaderTitle] = useState('Welcome, Ready for a drink!')

	const scanHandler = useCallback(async () => {
		Vibration.vibrate(300)
		const { status } = await BarCodeScanner.requestPermissionsAsync()
		status !== 'granted' ? setHasPermission(false) : setModalVisible(true)
	}, [setHasPermission])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle,
			headerRight: () => (
				<Button icon onPress={scanHandler}>
					<MaterialCommunityIcons
						name='barcode-scan'
						size={32}
						color='#ffa8a8'
					/>
				</Button>
			)
		})
	})

	useEffect(() => {
		hasPermission === false &&
			Alert.alert(
				'Permission Required',
				'Please enable this app to use camera',
				[
					{
						text: 'Ok',
						onPress: () => setHasPermission(null),
						style: 'default'
					}
				]
			)
	}, [hasPermission])

	useEffect(() => {
		let timeOut
		if (Object.keys(couponData).length) {
			timeOut = setTimeout(() => dispatch(resetState()), 5000)
			if (!couponData.active) {
				setHeaderTitle('Oops!!!')
			} else {
				setHeaderTitle('Yayy!!!!!')
			}
		}
		return () => {
			clearTimeout(timeOut)
			setHeaderTitle('Welcome, Ready for a drink!')
		}
	}, [couponData])

	const handleBarCodeScanned = ({ data }) => {
		try {
			const { code } = JSON.parse(data)
			dispatch(validateCoupon(code))
			setModalVisible(false)
		} catch (e) {
			setModalVisible(false)
			Alert.alert('Invalid QR', 'Scan a valid QR', [
				{
					text: 'Ok',
					onPress: () => {},
					style: 'default'
				}
			])
		}
	}

	const closeBarCodeScannerModal = useCallback(() => {
		setModalVisible(false)
	}, [setModalVisible])

	const displayScannedResult = () => {
		if (!Object.keys(couponData).length) {
			return (
				<ImageBackground
					source={require('../../assets/grab_drink_2.jpg')}
					style={styles.imageStyle}
				>
					<Text style={styles.text}>Scan to grab your drink</Text>
				</ImageBackground>
			)
		} else {
			if (!couponData.active) {
				return (
					<ImageBackground
						source={require('../../assets/giphy_sad.gif')}
						style={styles.imageStyle}
					>
						<Text style={styles.text}>
							{' '}
							Coupon used at: {couponData?.userAt}
						</Text>
					</ImageBackground>
				)
			}
			return (
				<ImageBackground
					source={require('../../assets/giphy.gif')}
					style={styles.imageStyle}
				>
					<Text style={styles.text}>Enjoy!!</Text>
				</ImageBackground>
			)
		}
	}
	return (
		<View style={styles.container}>
			<Modal
				visible={modalVisible}
				onPressCancelButton={closeBarCodeScannerModal}
			>
				<BarCodeScanner
					onBarCodeScanned={handleBarCodeScanned}
					style={StyleSheet.absoluteFillObject}
				/>
			</Modal>
			{displayScannedResult()}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#ffa8a8',
		position: 'relative'
	},
	imageStyle: {
		flex: 1,
		borderRadius: 20,
		justifyContent: 'center'
	},
	text: {
		color: 'white',
		fontSize: 42,
		lineHeight: 84,
		fontWeight: 'bold',
		textAlign: 'center',
		backgroundColor: '#000000c0'
	}
})

export default HomeScreen
