import React from 'react';
import { TouchableWithoutFeedback, View, Text, Linking, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
const Link = ({ label, link }) => {
	// console.log('Link (line 5)', link);
	return (
		<View style={styles.container}>
			<Paragraph style={styles.label}>{label}</Paragraph>
			<TouchableWithoutFeedback onPress={() => Linking.openURL(link)}>
				<Paragraph style={styles.link}>{link}</Paragraph>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
	},
	link: {
		color: '#0077b6',
	},
	label: {
		fontWeight: '500',
	},
});
export default Link;
