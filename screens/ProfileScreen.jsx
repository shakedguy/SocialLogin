import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../contexts/AuthContext';

const ProfileScreen = () => {
	const { currentUser } = useAuth();

	return (
		<View style={styles.container}>
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
});
export default ProfileScreen;
