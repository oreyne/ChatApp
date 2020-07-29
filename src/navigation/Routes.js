import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';

// import firebase from 'firebase';
import configFire from '../sources/key';

export default function Routes() {

	const { user, setUser } = useContext(AuthContext);
	const [ loading, setLoading ] = useState(true);
	const [ initializing, setInitializing ] = useState(true);

	function onAuthStateChanged(user){
		setUser(user);
		if (initializing) setInitializing(false);
		setLoading(false);
	}

	useEffect(() => {
		//TODO make a Singlenton
		firebase.initializeApp(configFire);
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	if (loading){
		return <Loading />;
	}

	return (
		<NavigationContainer>
			{ user ? <HomeStack /> : <AuthStack /> }
		</NavigationContainer>
	);
}