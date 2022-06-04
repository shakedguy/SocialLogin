import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

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

export default styles;
