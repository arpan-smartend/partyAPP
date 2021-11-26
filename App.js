import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import AccountScreen from './src/screens/AccountScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import store from './src/store/index'

const { Navigator: TabNavigator, Screen: TabScreen } =
	createBottomTabNavigator()

const AppContainer = () => {
	return (
		<NavigationContainer style={styles.container}>
			<TabNavigator
				initialRouteName='Home'
				screenOptions={({ route: { name } }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						size = focused ? 28 : 24
						switch (name) {
							case 'Home':
								return (
									<MaterialCommunityIcons
										name='home'
										size={size}
										color={color}
									/>
								)
							case 'Account':
								return (
									<MaterialCommunityIcons
										name='account'
										size={size}
										color={color}
									/>
								)
							default:
								return
						}
					},

					tabBarActiveTintColor: '#234e9b',
					tabBarItemStyle: {
						justifyContent: Platform.OS === 'android' ? 'center' : 'flex-end',
						paddingBottom: Platform.OS === 'android' ? 5 : 0
					},
					tabBarStyle: {
						backgroundColor: '#fff',
						borderTopColor: '#234e9b',
						borderTopWidth: 0.3
					},
					tabBarHideOnKeyboard: true
				})}
			>
				<TabScreen name='Home' component={HomeScreen} />
				<TabScreen name='Account' component={AccountScreen} />
			</TabNavigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

const App = () => (
	<Provider store={store}>
		<AppContainer />
	</Provider>
)

export default App
