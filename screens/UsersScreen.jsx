import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, ScrollView } from 'react-native';
import axios from 'axios';
import { DataTable, Card, Button, Paragraph } from 'react-native-paper';
import ListItem from '../components/ListItem';

// const getMenu = async () => {
// 	const response = await axios.get('http://www.socialloginproject.com/api/menu');
// 	console.log(response.data);
// };

const getUsersFromBackend = async () => {
	try {
		const response = await axios.get('https://www.socialloginproject.com/mobile/users');
		if (response.status === 200) {
			return response.data;
		} else {
			return null;
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};

const optionsPerPage = [2, 3, 4];

const UsersScreen = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

	useEffect(() => {
		setPage(0);
	}, [itemsPerPage]);
	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await getUsersFromBackend();
				setUsers(response);
			} catch (error) {
				console.log(error);
			}
		};
		getUsers();
	}, []);

	if (!users) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	} else {
		const list = () => {
			if (Array.isArray(users)) {
				return users.map((user) => {
					return (
						<DataTable.Row style={styles.tableRow} key={user.uid}>
							<DataTable.Cell style={styles.cell}>
								<Paragraph style={styles.cell}> {user.displayName || 'undefine'}</Paragraph>
							</DataTable.Cell>
							<DataTable.Cell style={styles.cell}>
								<Paragraph style={styles.cell}>{user.email || 'undefine'}</Paragraph>
							</DataTable.Cell>
							<DataTable.Cell style={styles.cell}>
								{user.phoneNumber && (
									<Button
										color='#55bbfb'
										onPress={async () => {
											await Linking.openURL(`tel://${user.phoneNumber}`);
										}}>
										<Paragraph style={{ ...styles.cell, ...styles.phone }}>{user.phoneNumber}</Paragraph>
									</Button>
								)}
								{!user.phoneNumber && <Paragraph style={styles.cell}>undefine</Paragraph>}
							</DataTable.Cell>
						</DataTable.Row>
					);
				});
			} else {
				return (
					<View>
						<Text>No users found</Text>
					</View>
				);
			}
		};
		return (
			<ScrollView style={styles.container} horizontal={true}>
				<Card style={styles.card}>
					<DataTable style={styles.datatable}>
						<DataTable.Header style={styles.datatableHeader}>
							<DataTable.Title style={styles.datatableTitle}>displayName</DataTable.Title>
							<DataTable.Title style={styles.datatableTitle}>email</DataTable.Title>
							<DataTable.Title style={styles.datatableTitle}>phoneNumber</DataTable.Title>
						</DataTable.Header>
						{list()}

						<DataTable.Pagination
							style={styles.pagination}
							page={page}
							numberOfPages={3}
							onPageChange={(page) => setPage(page)}
							label='1-2 of 6'
							optionsPerPage={optionsPerPage}
							itemsPerPage={itemsPerPage}
							setItemsPerPage={setItemsPerPage}
							showFastPagination
							optionsLabel={'Rows per page'}
						/>
					</DataTable>
				</Card>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
		alignContent: 'center',
	},
	card: {
		alignContent: 'flex-start',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingVertical: 30,
		paddingHorizontal: 20,
		width: '98%',
		height: '90%',
		shadowRadius: 20,
		shadowOpacity: 0.3,
		shadowOffset: { width: 10, height: 10 },
		shadowColor: '#000',
	},
	datatable: {
		borderRadius: 4,
	},
	datatableHeader: {
		backgroundColor: '#55bbfb',
		borderTopStartRadius: 4,
		borderTopEndRadius: 4,
		borderWidth: 1,
		borderColor: '#000',
	},
	datatableTitle: {
		color: '#e8e8e8',
		textAlign: 'center',
		minWidth: 70,
	},
	tableRow: {
		borderWidth: 1,
		borderColor: '#000',
		minWidth: 70,
	},
	pagination: {
		borderWidth: 1,
		borderColor: '#000',
		color: '#000',
		backgroundColor: '#55bbfb',
		borderBottomStartRadius: 4,
		borderBottomEndRadius: 4,
	},
	cell: {
		fontSize: 12,
		minWidth: 70,
	},
	phone: {
		color: '#55bbfb',
		minWidth: 70,
	},
});
export default UsersScreen;
