import React, { useContext, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { View, StyleSheet, Button } from 'react-native';
import { Title } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

export default function LoginScreen({navigation}) {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Title style={styles.titleText}>Welcome to Chat app</Title>
	        <FormInput
	            labenName='Email'
	            value={email}
	            autoCapitalize='none'
	            onChangeText={userEmail => setEmail(userEmail)}
	        />
	        <FormInput
	            labenName='Password'
	            value={password}
	            secureTextEntry={true}
	            onChangeText={userPassword => setPassword(userPassword)}
	        />
	        <FormButton
	            title='Login'
	            modeValue='contained'
	            labelStyle={styles.loginButtonLabel}            
	            onPress={() => login(email, password)}
	        />
	        <FormButton
	            title='New user? Join here'
	            modeValue='text'
	            uppercase={false}
	            labelStyle={styles.navButtonLabel}     
	            onPress = {() => navigation.navigate('Signup')}       
	        />   
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f5f5f5',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	titleText: {
		fontSize: 24,
		marginBottom: 10
	},
	loginButtonLabel: {
		fontSize: 22	
	},
	navButtonText: {
		fontSize: 16
	}
});