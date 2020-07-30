import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { GiftedChat, Bubble, Send, SystemMessage } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function RoomScreen({ route }){
	const { user } = useContext(AuthContext);
	const currentUser = user.toJSON();
	const { thread } = route.params;
	const [ messages, setMessages ] = useState(
		[
			{
				_id: 0,
				text: 'New room created',
				createdAt: new Date().getTime(),
				system: true
			},
			{
				_id: 1,
				text: 'Hello',
				createdAt: new Date().getTime(),
				user: {
					_id: 2,
					name: 'Test User'
				}
			}
		]
	);

	async function handleSend(messages) {
		const text = messages[0].text;

		firestore()
		.collection('THREADS')
		.doc(thread._id)
		.collection('MESSAGES')
		.add({
			text,
			creadAt: new Date().getTime(),
			user: {
				_id: currentUser.uid,
				email: currentUser.email
			}
		});

		await firestore()
	    .collection('THREADS')
	    .doc(thread._id)
	    .set(
	      {
	        latestMessage: {
	          text,
	          createdAt: new Date().getTime()
	        }
	      },
	      { merge: true }
	    );
	}

	useEffect(() => {
	    const messagesListener = firestore()
	      .collection('THREADS')
	      .doc(thread._id)
	      .collection('MESSAGES')
	      .orderBy('createdAt', 'desc')
	      .onSnapshot(querySnapshot => {
	        const messages = querySnapshot.docs.map(doc => {
	          const firebaseData = doc.data();

	          const data = {
	            _id: doc.id,
	            text: '',
	            createdAt: new Date().getTime(),
	            ...firebaseData
	          };

	          if (!firebaseData.system) {
	            data.user = {
	              ...firebaseData.user,
	              name: firebaseData.user.email
	            };
	          }

	          return data;
	        });

	        setMessages(messages);
	      });

	    return () => messagesListener();
  	}, []);

  	function renderBubble(props) {
		return (
			<Bubble
        		{...props}
        		wrapperStyle={{
          			right: {
		            	backgroundColor: '#6646ee'
		          	}
		        }}
		        textStyle={{
		          right: {
		            color: '#fff'
		          }
		        }}
		      />
		);
	}

	function renderLoading() {
		return(
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color='#6646ee' />
			</View>
		);
	}

	function renderSend(props) {
		return(
			<Send {...props}>
				<View style={styles.sendingContainer}>
					<IconButton
						icon='send-circle'
						size={32}
						color='#6646ee'
					/>
				</View>
			</Send>
		);
	}

	function scrollToBottomComponent() {
		return (
			<View style={styles.bottonComponentContainer}>
				<IconButton icon='chevron-double-down' size={36} color='#6646ee' />
			</View>
		);
	}

	function renderSystemMessage(props) {
		return (
			<SystemMessage
				{...props}
				wrapperStyle={styles.systemMessageWrapper}
				textStyle={styles.systemMessageText}
			/>
		);
	}

	return (
		<GiftedChat 
			messages={messages}
			onSend={handleSend}
      		user={{ _id: currentUser.uid }}      		
			placeholder='Type your message here...'
			alwaysShowSend
			showUserAvatar
			scrollToBottom
			renderBubble={renderBubble}
			renderLoading={renderLoading}
			renderSend={renderSend}			
			scrollToBottomComponent={scrollToBottomComponent}			
			renderSystemMessage={renderSystemMessage}
		/>
	);
}

const styles = StyleSheet.create({
	sendingContainer: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	systemMessageText: {
		fontSize: 14,
		color: '#fff',
		fontWeight: 'bold',
		backgroundColor: '#443211'
	}
});