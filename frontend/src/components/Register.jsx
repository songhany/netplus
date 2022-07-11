import React from 'react';
import { Form, Input, Button, message } from 'antd';
import http from '../service';

const Register = ({ history }) => {
	const [form] = Form.useForm();
	const formItemLayout = {
		labelCol: { xs: { span: 24 }, sm: { span: 8 } },
		wrapperCol: { xs: { span: 24 }, sm: { span: 16 } }
	};
	const tailFormItemLayout = { wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } } };

	const onFinish = params => {
		const { username, password } = params;
		http
			.post('/signup', { username, password })
			.then(res => {
				console.log(res);
				message.success('Registration succeed!');
				history.push('/login');
			})
			.catct(err => message.error('Registration failed!'));
	};

	return (
		<Form {...formItemLayout} form={form} name='register' onFinish={onFinish} className='register'>
			<Form.Item name='username' label='Username' rules={[{ required: true, message: 'Please input your username!' }]}>
				<Input />
			</Form.Item>

			<Form.Item
				name='password'
				label='Password'
				rules={[{ required: true, message: 'Please input your password!' }]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name='confirm'
				label='Confirm Password'
				dependencies={['password']}
				hasFeedback
				rules={[
					{ required: true, message: 'Please confirm your password!' },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}

							return Promise.reject(new Error('The two passwords that you entered do not match!'));
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit' className='register-btn'>
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Register;
