import React from 'react';
import { StyleSheet, StatusBar, View, ImageBackground } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
	const { currentUser } = useAuth();

	return (
		<View style={styles.container}>
			<StatusBar barStyle='dark-content' />
			<ProfileCard user={currentUser} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'flex-start',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: 30,
	},
	backgroundImg: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		width: window.width,
		opacity: 0.9,
	},
});
export default ProfileScreen;
