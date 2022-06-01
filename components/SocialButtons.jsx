import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-native-paper';

const SocialButtons = () => {
	const { login, logout } = useAuth();
	return (
		<>
			<TouchableWithoutFeedback onPress={login}>
				<View style={styles.button}>
					<Text style={styles.text}>SignIn</Text>
				</View>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={logout}>
				<View style={styles.button}>
					<Text style={styles.text}>Logout</Text>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#0077b6',
		paddingHorizontal: 25,
		marginVertical: 10,
		paddingVertical: 12,
		color: '#e5e5e5',
		alignItems: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		borderRadius: 3,
	},
	text: {
		color: '#e5e5e5',
	},
});
export default SocialButtons;
