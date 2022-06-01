import dayjs from 'dayjs';
const User = class {
	constructor(
		id = null,
		name = null,
		email = null,
		phoneNumber = null,
		photoURL = null,
		provider = null,
		metadata = null,
		admin = null
	) {
		this.Id = id;
		this.Name = name;
		this.Email = email;
		this.PhoneNumber = phoneNumber;
		this.PhotoURL = photoURL;
		this.Provider = provider;
		this.Metadata = metadata;
		this.CreationTime = dayjs(metadata.creationTime).format('DD/MM/YYYY HH:mm') || 'undefined';
		this.LastLogin = dayjs(metadata.lastSignInTime).format('DD/MM/YYYY HH:mm') || 'undefined';
		this.Admin = admin;
	}

	static create(user) {
		this.Id = user.Id;
		this.Name = user.Name;
		this.Email = user.Email;
		this.PhoneNumber = user.PhoneNumber;
		this.PhotoURL = user.PhotoURL;
		this.Provider = user.Provider;
		this.CreationTime = user.CreationTime;
		this.LastLogin = user.LastLogin;
		this.Admin = user.Admin;
	}

	static fromJson(json) {
		return new User(json);
	}

	static toJson() {
		return {
			Id: this.Id,
			Name: this.Name,
			Email: this.Email,
			PhoneNumber: this.PhoneNumber,
			PhotoURL: this.PhotoURL,
			Provider: this.Provider,
			CreationTime: this.CreationTime,
			LastLogin: this.LastLogin,
			Admin: this.Admin,
		};
	}
	// "creationTimestamp": 1653391467193, "displayName": "Guy Shaked",
	// "email": null, "isNewUser": false, "lastSignInTimestamp": 1653415605918,
	// "phoneNumber": null, "photoURL": null,
	// "providerID": "Firebase", "uid": "mRwQLrRwkAWgD58P6JDakoDfZGC2"

	static fromFirebase(user) {
		// console.log('User.fromFirebase (line 62)', user);

		const providerData = user.providerData.find((obj) => obj.hasOwnProperty('providerId'));
		const name = providerData.displayName || 'undefined';
		const email = providerData.email || 'undefined';
		const phoneNumber = providerData.phoneNumber || user.phoneNumber || 'undefined';
		const photoURL = phoneNumber.photoURL || user.photoURL || null;
		const provider = providerData ? providerData.providerId : 'undefined';
		const metadata = user.metadata || 'undefined';
		const admin = user.isNewUser || false;
		// console.log('User.fromFirebase (line 72)', provider);
		return new User(user.uid, name, email, phoneNumber, photoURL, provider, metadata, admin);
	}

	static toFirebase() {
		return {
			uid: this.Id,
			displayName: this.Name,
			email: this.Email,
			phoneNumber: this.PhoneNumber,
			photoURL: this.PhotoURL,
			providerData: [
				{
					providerId: this.Provider,
				},
			],
			metadata: {
				creationTime: this.CreationTime,
				lastSignInTime: this.LastLogin,
			},
			isAnonymous: this.Admin,
		};
	}
};

export default User;
