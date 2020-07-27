import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Routes from './Routes';

export default function Provider() {
	return(
		<PaperProvider>
			<Routes />
		</PaperProvider>
	);
}