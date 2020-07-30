import React, { useState } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function RoomScreen(){
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

	function renderBubble(props) {
		return (
			<Bubble
        		{...props}
        		wrapperStyle={{
          		right: {
		            // Here is the color change
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

	function scrollToBottomComponent() {
		return (
			<View style={styles.bottonComponentContainer}>
				<IconButton icon='chevron-double-down' size={36} color='#6646ee' />
			</View>
		);
	}

	function handleSend(newMessage = []) {
		setMessages(GiftedChat.append(messages, newMessage));
	}

	return (
		<GiftedChat 
			messages={messages}
			onSend={newMessage => handleSend(newMessage)}
			user={{ _id: 1, name: 'User Test' }}
      		renderBubble={renderBubble}
			placeholder='Type your message here...'
			showUserAvatar
			alwaysShowSend
			renderSend={renderSend}
			scrollToBottom
			scrollToBottomComponent={scrollToBottomComponent}
			renderLoading={renderLoading}
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
	}
});