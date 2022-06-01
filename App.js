import React, { useRef, useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import AuthContextProvider from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogoutScreen from './screens/LogoutScreen';
import UsersScreen from './screens/UsersScreen';
import { useAuth } from './contexts/AuthContext';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

const cacheResourcesAsync = async () => {
	const images = [require('./assets/auth_icon3x.png')];

	const cacheImages = images.map((image) => {
		return Asset.fromModule(image).downloadAsync();
	});
	return Promise.all(cacheImages);
};

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
	const { isLoggedIn, currentUser } = useAuth();

	return (
		<Drawer.Navigator
			screenOptions={{
				drawerStyle: styles.drawerContent,
				drawerActiveTintColor: '#fafafa',
				drawerActiveBackgroundColor: '#0077b6',
			}}>
			{!isLoggedIn && <Drawer.Screen name='HomeScreen' component={HomeScreen} options={{ title: 'Home' }} />}
			{isLoggedIn && <Drawer.Screen name='ProfileScreen' component={ProfileScreen} options={{ title: 'Profile' }} />}
			{isLoggedIn && currentUser && currentUser.Admin && (
				<Drawer.Screen name='UsersScreen' component={UsersScreen} options={{ title: 'Users' }} />
			)}
			{isLoggedIn && <Drawer.Screen name='LogoutScreen' component={LogoutScreen} options={{ title: 'Logout' }} />}
		</Drawer.Navigator>
	);
};

const App = () => {
	const [isReady, setIsReady] = useState(false);
	const routeNameRef = useRef();
	const navigationRef = useRef();
	if (!isReady) {
		return <AppLoading startAsync={cacheResourcesAsync} onFinish={() => setIsReady(true)} onError={console.warn} />;
	}
	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.current.getCurrentRoute().name;
			}}
			onStateChange={async () => {
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.current.getCurrentRoute().name;

				if (previousRouteName !== currentRouteName) {
					await analytics().logScreenView({
						screen_name: currentRouteName,
						screen_class: currentRouteName,
					});
				}
				routeNameRef.current = currentRouteName;
			}}>
			<AuthContextProvider>
				<StatusBar barStyle='light-content' />
				<MyDrawer />
			</AuthContextProvider>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	backgroundImg: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		opacity: 0.9,
	},
});

export default App;
