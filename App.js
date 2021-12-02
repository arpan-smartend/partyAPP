import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import AccountScreen from './src/screens/AccountScreen'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import store from './src/store/index'

// const { Navigator: TabNavigator, Screen: TabScreen } =
// 	createBottomTabNavigator()

const { Navigator: StackNavigator, Screen: StackScreen } =
	createStackNavigator()

const AppContainer = () => {
	return (
		<NavigationContainer style={styles.container}>
			<StackNavigator
				initialRouteName='Home'
				screenOptions={{
					headerBackground: () => (
						<Image
							style={styles.headerBackgroundImage}
							source={require('./assets/headerBgd.jpg')}
						/>
					),
					headerStyle: {
						height: 120
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontSize: 25
					},
					headerTitleContainerStyle: {
						position: 'absolute',
						alignSelf: 'center'
					},
					headerRightContainerStyle: {
						position: 'absolute',
						alignSelf: 'center',
						right: 20
					}
				}}
			>
				<StackScreen name='Home' component={HomeScreen} />
			</StackNavigator>
			{/* <TabNavigator
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
			</TabNavigator> */}
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerBackgroundImage: {
		height: 120,
		width: '100%'
	}
})

const App = () => (
	<Provider store={store}>
		<AppContainer />
	</Provider>
)

export default App
