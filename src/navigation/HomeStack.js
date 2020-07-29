import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddRoomScreen from '../screens/AddRoomScreen';

const Stack = createStackNavigator();
const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

function ChatApp() {
	return (
		<ChatAppStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#6646ee'
				}
			}}
		>
			<ChatAppStack.Screen name='Home' component={HomeScreen} />
		</ChatAppStack.Navigator>
	);
}

export default function HomeStack() {
	return(
		<ModalStack.Navigator mode='modal' headerMode='nonde'>
			<ModalStack.Screen name='ChatApp' component={ChatApp} />
			<ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
		</ModalStack.Navigator>		
	);
}