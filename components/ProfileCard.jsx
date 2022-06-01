import React from 'react';
import { StyleSheet, FlatList, View, Linking, Button, Text } from 'react-native';
import { Card, Title, List, Paragraph, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Link from './Link';
import ListItem from './ListItem';

const LeftContent = ({ photo }) =>
	photo ? (
		<Avatar.Image size={32} source={{ uri: photo }} />
	) : (
		<Avatar.Icon
			style={styles.avatar}
			size={32}
			icon={() => <Icon color={'#858585'} size={32} name='person-circle-outline' />}
		/>
	);

const ProfileCard = ({ user }) => {
	if (!user) return <Text>Loading...</Text>;
	else {
		return (
			<Card style={styles.card}>
				<Card.Content>
					<Card.Title
						style={styles.title}
						title={user.Name || user.Email || user.Phone}
						left={() => <LeftContent photo={user.PhotoURL} />}></Card.Title>
					<FlatList
						data={[
							{ key: 'Name: ', data: user.Name || 'undefined' },
							{ key: 'Email: ', data: user.Email || 'undefined' },
							{ key: 'Phone: ', data: user.Phone || 'undefined' },
							{ key: 'Creation Time: ', data: user.CreationTime || 'undefined' },
							{ key: 'Last Login: ', data: user.LastLogin || 'undefined' },
							{ key: 'Provider: ', data: user.Provider || 'undefined' },
							{ key: 'Admin: ', data: `${user.Admin}` || 'false' },
							{ key: 'PhotoURL: ', data: user.PhotoURL || 'undefined' },
						]}
						renderItem={({ item }) => <ListItem label={item.key} data={item.data} />}
					/>
				</Card.Content>
			</Card>
		);
	}
};

const styles = StyleSheet.create({
	card: {
		alignContent: 'flex-start',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 50,
		minWidth: 300,
		maxHeight: 400,
		shadowRadius: 20,
		shadowOpacity: 0.3,
		shadowOffset: { width: 10, height: 10 },
		shadowColor: '#000',
	},
	title: {
		fontSize: 14,
	},
	avatar: {
		padding: 0,
		margin: 0,
		backgroundColor: 'transparent',
	},
	icon: {
		padding: 0,
		margin: 0,
		fontSize: 24,
	},
	label: {
		fontWeight: '500',
	},
});
export default ProfileCard;
