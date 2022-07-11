import { message } from 'antd';
import { BASE_URL } from '../constants';
const axios = require('axios');

const METHODS = ['get', 'post', 'put', 'delete'];

// Global config
const DEFAULT_CONFIG = {
	timeout: 15 * 1000,
	headers: { 'Content-Type': 'application/json' },
	baseURL: BASE_URL
};

const instance = axios.create(DEFAULT_CONFIG);

/**
 * Response interecptors
 */
instance.interceptors.response.use(
	res => (res.status >= 200 || res.status < 300 ? res.data : Promise.reject('Request error, please try again later!')),
	err => {
		message.error('Request error, please try again later!');
		return Promise.reject(err);
	}
);

const http = METHODS.reduce((pre, key) => {
	pre[key] = (url, data, func) => {
		const requestData = {
			method: key,
			url,
			[key === 'get' ? 'params' : 'data']: data
		};

		func && func(instance);

		return instance
			.request(requestData)
			.then(res => Promise.resolve(res))
			.catch(err => Promise.reject(err));
	};

	return pre;
}, {});

export default http;
