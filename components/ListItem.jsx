import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import Link from './Link';
const ListItem = ({ label, data }) => {
	return label.includes('PhotoURL') && data !== null && data !== 'undefined' ? (
		<Link label={label} link={data} />
	) : (
		<View style={styles.container}>
			<Paragraph style={styles.label}>{label}</Paragraph>
			<Paragraph>{data}</Paragraph>
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
export default ListItem;
