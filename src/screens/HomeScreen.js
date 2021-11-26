import React, { useLayoutEffect, useCallback, useState, useEffect } from 'react'
import { View, Vibration, StyleSheet, Alert, Text, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Button from '../components/UI/Button'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Modal from '../components/UI/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { validateCoupon } from '../store/CouponSlice'

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const { couponData, errorMessage, error, success } = useSelector(
		(state) => state.coupon
	)
	const [modalVisible, setModalVisible] = useState(false)
	const [hasPermission, setHasPermission] = useState(null)

	const scanHandler = useCallback(async () => {
		Vibration.vibrate(300)
		const { status } = await BarCodeScanner.requestPermissionsAsync()
		status !== 'granted' ? setHasPermission(false) : setModalVisible(true)
	}, [setHasPermission])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: 'Welcome Arpan Kumar Nandi', //fetch from state
			headerRight: () => (
				<Button icon onPress={scanHandler}>
					<MaterialCommunityIcons
						name='barcode-scan'
						size={28}
						color='#234e9b'
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
		console.log(couponData)
		if (!Object.keys(couponData).length) {
			return <Text>Pls Scan a QR code</Text>
		} else {
			if (!couponData.active) {
				return (
					<View>
						<Image source={require('../../assets/giphy_sad.gif')} />
						<Text>{couponData?.usedAt}</Text>
					</View>
				)
			}
			return (
				<View>
					<Image source={require('../../assets/giphy.gif')} />
				</View>
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
		backgroundColor: '#fff'
	}
})

export default HomeScreen
