import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';

const Main = ({ isLoggedIn, handleLoggedIn }) => {
	const showLogin = () => (isLoggedIn ? <Redirect to='/home' /> : <Login handleLoggedIn={handleLoggedIn} />);

	const showHome = () => (isLoggedIn ? <Home /> : <Redirect to='/login' />);

	return (
		<div className='main'>
			<Switch>
				<Route path='/' exact render={showLogin} />
				<Route path='/login' render={showLogin} />
				<Route path='/register' component={Register} />
				<Route path='/home' render={showHome} />
			</Switch>
		</div>
	);
};

export default Main;
