import React, { useEffect } from 'react';
import './App.css';
import SuperTokensMain from './services/Supertokens/SuperTokens';
import AppWrapper from './routes/AppWrapper';
import { ThemeProvider } from '@mui/material';
import { theme } from './utils/theme';
import { CssBaseline } from '@mui/material';

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<SuperTokensMain />
				<CssBaseline />
				<AppWrapper />
			</ThemeProvider>
		</>
	);
}

export default App;
