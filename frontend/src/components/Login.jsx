import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import http from '../service';
import { Link } from 'react-router-dom';

const Login = ({ handleLoggedIn }) => {
	const onFinish = params => {
		http
			.post('/signin', params)
			.then(res => {
				handleLoggedIn(res);
				message.success('Login succssfully!');
			})
			.catch(_ => message.error('Login failed!'));
	};

	return (
		<Form name='normal_login' className='login-form' onFinish={onFinish}>
			<Form.Item name='username' rules={[{ required: true, message: 'Please input your Username!' }]}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
			</Form.Item>
			<Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
				<Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' className='login-form-button'>
					Log in
				</Button>
				Or <Link to='/register'>Register now!</Link>
			</Form.Item>
		</Form>
	);
};

export default Login;
