import React, { useState } from 'react';
import { Input, Radio } from 'antd';
import { SEARCH_KEY } from '../constants';
const { Search } = Input;

const SearchBar = props => {
	const [searchType, setSearchType] = useState(SEARCH_KEY.all);
	const [error, setError] = useState('');

	const handleSearch = value => {
		if (searchType !== SEARCH_KEY.all && value === '') {
			setError('Please input your search keyword!');
			return;
		}

		setError('');
		props.handleSearch({ type: searchType, keyword: value });
	};

	const changeSearchType = event => {
		const searchType = event.target.value;
		setError('');
		setSearchType(searchType);
		if (searchType === SEARCH_KEY.all) {
			props.handleSearch({ type: searchType, keyword: '' });
		}
	};

	return (
		<div className='search-bar'>
			<Search
				placeholder='input search text'
				allowClear
				enterButton='Search'
				size='large'
				onSearch={handleSearch}
				disabled={searchType === SEARCH_KEY.all}
			/>
			<p className='error-msg'>{error}</p>

			<Radio.Group onChange={changeSearchType} value={searchType} className='search-type-group'>
				{Object.keys(SEARCH_KEY).map(item => (
					<Radio key={item} value={SEARCH_KEY[item]}>
						{item.charAt(0).toUpperCase() + item.slice(1)}
					</Radio>
				))}
			</Radio.Group>
		</div>
	);
};

export default SearchBar;
