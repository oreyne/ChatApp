import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
// import FormButton from '../components/FormButton';
import Loading from '../components/Loading';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen({ navigation }) {
	// const { user, logout } = useContext(AuthContext);
	const [threads, setThreads] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = firestore()
			.collection('THREADS')
			.orderBy('latestMessage.createdAt', 'desc')
			.onSnapshot((querySnapshot) => {
				const threads = querySnapshot.docs.map((documentSnapshot) => {
					return {
						_id: documentSnapshot.id,
						name: '',
						latestMessage: {
							text: ''
				        },
						...documentSnapshot.data(),
					};
				});

				setThreads(threads);

				if (loading) {
					setLoading(false);
				}
			});

			return () => unsubscribe();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return(
		<View style={styles.container}>
			<FlatList
				data={threads}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={() => <Divider />}
				renderItem={({ item }) => (
					<TouchableOpacity 
						onPress={() => navigation.navigate('Room', { thread: item } )}
					>
						<List.Item
							title={item.name}
							description={item.latestMessage.text}
							titleNumberOfLines={1}
							titleStyle={styles.listTitle}
							descriptionStyle={styles.listDescription}
							descriptionNumberOfLines={1}
						/>
					</TouchableOpacity>
				)}
			/>		
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#000000',
		flex: 1		
	},
	listTitle: {
		fontSize: 22
	},
	listDescription: {
		fontSize: 16
	}
});