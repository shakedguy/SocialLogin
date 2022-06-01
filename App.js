import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import AuthContextProvider from './contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogoutScreen from './screens/LogoutScreen';
import UsersScreen from './screens/UsersScreen';
import { useAuth } from './contexts/AuthContext';

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
	const routeNameRef = useRef();
	const navigationRef = useRef();
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
				<MyDrawer />
			</AuthContextProvider>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
	drawerTitleContainer: {
		width: '100%',
		textAlign: 'center',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		//blue color #5fa8d3
	},
	drawerTitleText: {
		fontSize: 24,
		fontWeight: '600',
	},
	drawerContent: {
		width: '60%',
		paddingHorizontal: 5,
		paddingVertical: 30,
	},
});

export default App;
