import React, { useState, useEffect } from 'react'
import {
	Text,
	Pressable,
	StyleSheet,
	Vibration,
	ActivityIndicator
} from 'react-native'
// we would include type in props later for primary / secondary buttons
const Button = ({
	onPress = () => {},
	title = '',
	loading = false,
	disabled = false,
	icon = false,
	children
}) => {
	const [pressStyle, setPressStyle] = useState({ backgroundColor: '#993270' })

	useEffect(() => {
		if (disabled) {
			setPressStyle({ backgroundColor: '#cccccc' })
		} else {
			setPressStyle({ backgroundColor: '#993270' })
		}
	}, [disabled])

	return (
		<Pressable
			disabled={disabled}
			style={icon ? [styles.icon] : [styles.button, pressStyle]}
			onPressIn={() => setPressStyle({ backgroundColor: '#c97baa' })}
			onPressOut={() => setPressStyle({ backgroundColor: '#993270' })}
			onPress={onPress}
			onLongPress={() => {
				Vibration.vibrate(100)
				onPress()
			}}
			delayLongPress={700}
		>
			{icon ? (
				children
			) : (
				<>
					<Text style={styles.textStyle}>{title}</Text>
					{loading && <ActivityIndicator size='small' color='#fff' />}
				</>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	button: {
		marginHorizontal: 20,
		marginVertical: 10,
		alignSelf: 'center',
		borderRadius: 10,
		width: '100%',
		backgroundColor: '#993270',
		padding: 10,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 1,
			height: 2
		},
		shadowOpacity: 0.2,
		shadowRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	icon: {
		margin: 0,
		alignSelf: 'center',
		width: '100%',
		backgroundColor: 'transparent',
		padding: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},

	textStyle: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 18,
		flex: 1,
		textAlign: 'center'
	}
})

export default Button
