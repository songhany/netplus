import React, { useEffect, useState } from 'react';
import Gallery from 'react-grid-gallery';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import http from '../service';
import { TOKEN_KEY } from '../constants';

const PhotoGallery = props => {
	const [images, setImages] = useState(props.images);
	const [curImgIdx, setCurImgIdx] = useState(0);
	const captionStyle = {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		maxHeight: '240px',
		overflow: 'hidden',
		position: 'absolute',
		bottom: '0',
		width: '100%',
		color: 'white',
		padding: '2px',
		fontSize: '90%'
	};

	const wrapperStyle = {
		display: 'block',
		minHeight: '1px',
		width: '100%',
		border: '1px solid #ddd',
		overflow: 'auto'
	};

	const imagaArr = images.map(item => ({
		...item,
		customOverlay: (
			<div style={captionStyle}>
				<div>{`${item.user}: ${item.caption}`}</div>
			</div>
		)
	}));

	const onDeleteImage = () => {
		if (window.confirm(`Are you sure you want to delete this image?`)) {
			const curImg = images[curImgIdx];
			const newImageArr = images.filter((_, index) => index !== curImgIdx);
			http
				.delete(`/post/${curImg.postId}`, null, instance => {
					instance.interceptors.request.use(config => {
						config.headers.Authorization = `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`;
						return config;
					});
				})
				.then(_ => setImages(newImageArr))
				.catch(err => message.error(err));
		}
	};

	const onCurrentImageChange = index => setCurImgIdx(index);

	useEffect(() => {
		setImages(props.images);
	}, [props.images]);

	return (
		<div style={wrapperStyle}>
			<Gallery
				images={imagaArr}
				enableImageSelection={false}
				backdropClosesModal={true}
				currentImageWillChange={onCurrentImageChange}
				customControls={[
					<button
						style={{ marginTop: '10px', marginLeft: '5px' }}
						key='deleteImage'
						type='primary'
						icon={<DeleteOutlined />}
						size='small'
						onClick={onDeleteImage}
					>
						Delete Image
					</button>
				]}
			/>
		</div>
	);
};

PhotoGallery.propTypes = {
	images: PropTypes.arrayOf(
		PropTypes.shape({
			user: PropTypes.string.isRequired,
			caption: PropTypes.string.isRequired,
			src: PropTypes.string.isRequired,
			thumbnail: PropTypes.string.isRequired,
			thumbnailWidth: PropTypes.number.isRequired,
			thumbnailHeight: PropTypes.number.isRequired
		})
	).isRequired
};

export default PhotoGallery;
