import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

export default function SignupScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Title style={styles.titleText}>Register to chat</Title>
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
	            title='Signup'
	            modalValue='contained'
	            labelStyle={styles.loginButtonLabel}            
	        />
	        <IconButton
	        	icon='keyboard-backspace'
	            size={30}
	            style={styles.navButton}
	            color='#6646ee'
	            onPress={() => navigation.goBack()}
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
	navButton: {
		marginTop: 10
	},
	navButtonText: {
		fontSize: 18
	}
});