import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
export const cacheResourcesAsync = async () => {
	const images = [require('../assets/auth_icon3x.png')];

	const cacheImages = images.map((image) => {
		return Asset.fromModule(image).downloadAsync();
	});
	return Promise.all(cacheImages);
};
export const prepare = async () => {
	try {
		await SplashScreen.preventAutoHideAsync();
		await cacheResourcesAsync();
	} catch (e) {
		console.warn(e);
	}
};
