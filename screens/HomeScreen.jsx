import React, { useEffect, useState, useCallback } from 'react';
import { View, StatusBar, ImageBackground, ActivityIndicator } from 'react-native';
import { Button, Title, Snackbar } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import styles from '../utils/styles';
import { prepare } from '../utils/helpers';

const HomeScreen = ({ route }) => {
	const [visible, setVisible] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const { login, isLoading } = useAuth();

	useEffect(() => {
		prepare().then(setIsReady(true));
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (isReady) {
			await SplashScreen.hideAsync();
		}
	}, [isReady]);

	useEffect(() => {
		if (route.params?.loggedOut) {
			setVisible(true);
		}
	}, [route.params?.loggedOut]);

	const onDismissSnackBar = () => setVisible(false);

	return (
		<View onLayout={onLayoutRootView} style={styles.container}>
			<StatusBar barStyle='dark-content' />
			<ImageBackground source={require('../assets/auth_icon3x.png')} style={styles.backgroundImage}>
				{isReady && (
					<>
						<View style={styles.upsideContainer}>
							<View style={styles.snackbarContainer}>
								<Snackbar style={styles.snackbar} visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
									Goodbye 👋🙃
								</Snackbar>
							</View>
							<Title style={styles.title}>Hello, Welcome to Social Login App</Title>
						</View>
						<View style={styles.downsideContainer}>
							<View style={styles.emptyBox} />
							<View style={styles.buttonContainer}>
								<Button
									style={styles.button}
									labelStyle={styles.label}
									color='#0077b6'
									mode='contained'
									uppercase={false}
									loading={isLoading}
									onPress={login}>
									Login
								</Button>
							</View>
						</View>
					</>
				)}
				{!isReady && <ActivityIndicator size='large' color='#0077b6' />}
			</ImageBackground>
		</View>
	);
};

export default HomeScreen;
