import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default function Loading() {
	return(
		<View style={styles.loadingContainer}>
			<ActivityIndicator size='large' color='#6646e' />
		</View>
	);
}

