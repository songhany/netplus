import React from 'react';
import logo from '../assets/img/logo.svg';
import { LoginOutlined } from '@ant-design/icons';

const TopBar = ({ isLoggedIn, handleLogout }) => {
	return (
		<header className='header'>
			<img className='header__logo' src={logo} alt='' />
			<span className='header__title'>Netplus</span>
			{isLoggedIn ? <LoginOutlined className='header__logout' onClick={handleLogout} /> : null}
		</header>
	);
};

export default TopBar;
