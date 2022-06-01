import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { Button, Title, Snackbar } from 'react-native-paper';
import { useAuth } from '../contexts/AuthContext';

const window = Dimensions.get('window');

const HomeScreen = ({ route }) => {
	const [visible, setVisible] = useState(false);

	const onDismissSnackBar = () => setVisible(false);
	const { login, isLoading } = useAuth();
	useEffect(() => {
		if (route.params?.loggedOut) {
			setVisible(true);
		}
	}, [route.params?.loggedOut]);

	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../assets/auth_icon3x.png')} style={styles.backgroundImg}>
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
			</ImageBackground>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
	},
	backgroundImg: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		opacity: 0.9,
	},
	upsideContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: window.width,
	},
	downsideContainer: {
		flex: 3,
		display: 'flex',
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		width: window.width,
		justifyContent: 'center',
	},
	emptyBox: {
		width: window.width,
		flex: 2,
	},
	buttonContainer: {
		flex: 1,
	},
	button: {
		borderColor: '#0077b6',
		paddingHorizontal: 15,
		paddingVertical: 8,
	},
	label: {
		fontSize: 16,
	},
	title: {
		fontSize: 22,
	},
	snackbarContainer: {
		justifyContent: 'flex-start',
		alignContent: 'flex-start',
		alignItems: 'center',
	},
	snackbar: {
		backgroundColor: '#0077b6',
		position: 'relative',
		top: 0,
	},
});
export default HomeScreen;
