import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import PhotoGallery from './PhotoGallery';
import { message, Tabs, Row, Col } from 'antd';
import { SEARCH_KEY, TOKEN_KEY } from '../constants';
import http from '../service';
import CreatePostButton from './CreatePostButton';
const { TabPane } = Tabs;

const Home = () => {
	const [activeTab, setActiveTab] = useState('image');
	const [posts, setPosts] = useState([]);
	const [searchOption, setSearchOption] = useState({
		type: SEARCH_KEY.all,
		keyword: ''
	});

	useEffect(() => {
		const { type, keyword } = searchOption;
		let prop;
		if (type === SEARCH_KEY.user) {
			prop = 'user';
		} else if (type === SEARCH_KEY.keyword) {
			prop = 'keywords';
		}
		const params = prop ? { [prop]: keyword } : null;
		http
			.get('/search', params, instance => {
				instance.interceptors.request.use(config => {
					config.headers.Authorization = `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`;

					return config;
				});
			})
			.then(res => setPosts(res))
			.catch(err => message.error(err));
	}, [searchOption]);

	const renderPost = type => {
		if (!posts || posts.length === 0) {
			return <div>No data!</div>;
		}
		if (type === 'image') {
			const imagesArr = posts
				.filter(item => item.type === 'image')
				.map(item => {
					const { id, url, message, user } = item;
					return {
						postId: id,
						src: url,
						thumbnail: url,
						thumbnailWidth: 300,
						thumbnailHeight: 200,
						caption: message,
						user
					};
				});

			return <PhotoGallery images={imagesArr} />;
		} else if (type === 'video') {
			return (
				<Row gutter={32}>
					{posts
						.filter(item => item.type === 'video')
						.map(item => (
							<Col span={8}>
								<video src={item.url} controls={true} className='video-block'>
									<p>{`${item.user}: ${item.caption}`}</p>
								</video>
							</Col>
						))}
				</Row>
			);
		}
	};

	const handleSearch = options => {
		const { type, keyword } = options;
		setSearchOption({ type, keyword });
	};

	const showPost = postType => {
		setActiveTab(postType);
		setTimeout(() => {
			setSearchOption({ type: SEARCH_KEY.all, keyword: '' });
		}, 3000);
	};

	const operations = <CreatePostButton onShowPost={showPost} />;
	return (
		<div>
			<SearchBar handleSearch={handleSearch} />
			<div className='display'>
				<Tabs defaultActiveKey={activeTab} onChange={key => setActiveTab(key)} tabBarExtraContent={operations}>
					<TabPane tab='Images' key='image'>
						{renderPost('image')}
					</TabPane>
					<TabPane tab='Videos' key='video'>
						{renderPost('video')}
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
};

export default Home;
