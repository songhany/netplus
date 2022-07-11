import React, { Component } from 'react';
import { Modal, Button, message } from 'antd';
import PostForm from './PostForm';
import http from '../service';
import { TOKEN_KEY } from '../constants';

class CreatePostButton extends Component {
	state = { visible: false, comfirmLoading: false };
	postForm = React.createRef();

	handleOk = () => {
		this.setState({ visible: false });
		const { current } = this.postForm;
		current
			.validateFields()
			.then(form => {
				const { description, uploadPost } = form;
				const { type, originFileObj } = uploadPost[0];
				const postType = type.match(/^(image|video)/g)[0];
				if (postType) {
					const formData = new FormData();
					formData.append('message', description);
					formData.append('media_file', originFileObj);

					http
						.post('/upload', formData, instance => {
							instance.interceptors.request.use(config => {
								config.headers.Authorization = `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`;

								return config;
							});
						})
						.then(_ => {
							message.success('The image/video is uploaded!');
							current.resetFields();
							this.handleCancel();
							this.props.onShowPost(postType);
							this.setState({ confirmLoading: false });
						})
						.catch(err => {
							console.log('Upload image/video failed: ', err.message);
							message.error('Failed to upload image/video!');
							this.setState({ confirmLoading: false });
						});
				}
			})
			.catch(err => console.log(err));
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	render() {
		const { visible, confirmLoading } = this.state;

		return (
			<div>
				<Button type='primary' onClick={() => this.setState({ visible: true })}>
					Create New Post
				</Button>
				<Modal
					title='Create New Post'
					visible={visible}
					okText='Create'
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					confirmLoading={confirmLoading}
				>
					<PostForm ref={this.postForm} />
				</Modal>
			</div>
		);
	}
}

export default CreatePostButton;
