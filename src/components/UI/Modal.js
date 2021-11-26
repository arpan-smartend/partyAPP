import React from 'react'
import { StyleSheet, Pressable, Text, Modal, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const UIModal = ({
	visible = false,
	children,
	cancelButtonTitle = 'cancel',
	confirmButtonTitle = 'ok',
	onPressCancelButton = () => {},
	onPressConfirmButton = () => {},
	fullScreen = true
}) => {
	return (
		<Modal
			animationType='slide'
			transparent
			visible={visible}
			onRequestClose={onPressCancelButton}
		>
			{fullScreen ? (
				<View style={styles.fullScreen}>
					<Pressable style={styles.closeIcon} onPress={onPressCancelButton}>
						<MaterialCommunityIcons name='close' size={32} color='#fff' />
					</Pressable>
					{children}
				</View>
			) : (
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.modalContent}>{children}</View>
						<View style={styles.actionButtons}>
							<Pressable
								style={[styles.button, styles.buttonA]}
								onPress={onPressCancelButton}
							>
								<Text style={{ color: 'red' }}>{cancelButtonTitle}</Text>
							</Pressable>
							<Pressable
								style={[styles.button, styles.buttonB]}
								onPress={onPressConfirmButton}
							>
								<Text style={{ color: '#007AFF', fontWeight: 'bold' }}>
									{confirmButtonTitle}
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}
		</Modal>
	)
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	fullScreen: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row'
	},
	closeIcon: {
		alignSelf: 'flex-start',
		marginLeft: 30,
		marginTop: 100,
		zIndex: 999
	},
	modalView: {
		margin: 20,
		backgroundColor: '#fff',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: '#4e4a5e',
		shadowOffset: {
			width: 0,
			height: 2
		},
		height: 200,
		width: 300,
		shadowOpacity: 0.25,
		shadowRadius: 5,
		elevation: 5
	},
	button: {
		padding: 10
	},
	modalContent: {
		padding: 30,
		flex: 3
	},
	actionButtons: {
		flex: 1,
		flexDirection: 'row',
		borderTopColor: '#234e9b',
		borderTopWidth: 2,
		width: '100%',
		paddingVertical: 5
	},
	buttonA: {
		flex: 1,
		alignItems: 'center',
		borderRightColor: '#234e9b',
		borderRightWidth: 2
	},
	buttonB: {
		flex: 1,
		alignItems: 'center'
	}
})

export default UIModal
