import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import User from '../models/User';
import Auth from 'react-native-firebaseui-auth';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import axios from 'axios';

const verifyTokenWithBackend = async (idToken) => {
	try {
		const response = await axios.post(
			'https://www.socialloginproject.com/mobile/login',
			{ idToken },
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		if (response.status === 200 || response.status === 201) {
			return response.data;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

const AuthContext = createContext({
	currentUser: null,
	isLoggedIn: false,
	isLoading: false,
	login: () => Promise,
	logout: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

const providers =
	Platform.OS === 'ios'
		? ['apple', 'google', 'facebook', 'microsoft', 'twitter', 'github', 'email', 'phone']
		: ['google', 'apple', 'facebook', 'microsoft', 'twitter', 'github', 'email', 'phone'];

const config = {
	providers,
	allowNewEmailAccounts: true,
	tosUrl: 'https://www.google.com',
	privacyPolicyUrl: 'https://www.google.com',
};

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigator = useNavigation();

	const onAuthStateChanged = async (userCredentials) => {
		if (userCredentials) {
			const idToken = await userCredentials.getIdToken();
			const user = await verifyTokenWithBackend(idToken);
			setIsLoggedIn(true);
			setCurrentUser(user);
			navigator.navigate('ProfileScreen');
		} else {
			setCurrentUser(null);
			const loggedOut =
				navigator.getState() !== undefined &&
				navigator.getState().history !== undefined &&
				navigator.getState().history !== null;
			navigator.navigate('HomeScreen', { loggedOut });
		}
	};

	useEffect(() => auth().onAuthStateChanged(onAuthStateChanged), []);

	const login = async () => {
		setIsLoading(true);
		try {
			await Auth.signIn(config);
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	const logout = async () => {
		setIsLoading(true);
		setIsLoggedIn(false);
		await Auth.signOut();
		console.log('logged out');
		setIsLoading(false);

		// console.log("logout (AuthContext line 67)'", currentUser);
	};

	const value = {
		currentUser,
		isLoggedIn,
		isLoading,
		login,
		logout,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
