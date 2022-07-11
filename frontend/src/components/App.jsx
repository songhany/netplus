import React, { useState } from 'react';
import TopBar from './TopBar';
import Main from './Main';
import { TOKEN_KEY } from '../constants';
import '../styles/App.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem(TOKEN_KEY) ? true : false);

	const logout = () => {
		sessionStorage.removeItem(TOKEN_KEY);
		setIsLoggedIn(false);
	};

	const loggedIn = token => {
		if (token) {
			sessionStorage.setItem(TOKEN_KEY, token);
			setIsLoggedIn(true);
		}
	};

	return (
		<div className='App'>
			<TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
			<Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
		</div>
	);
}

export default App;
