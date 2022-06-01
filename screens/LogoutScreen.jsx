import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
const LogoutScreen = () => {
	const { logout } = useAuth();

	useEffect(() => {
		const logoutAsync = async () => {
			await logout();
		};
		logoutAsync();
	}, []);
	return <></>;
};
export default LogoutScreen;
