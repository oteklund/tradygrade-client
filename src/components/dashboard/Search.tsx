/*
This component enables the user to search for sales items. When the search is run, the user is redirected to the Search Results view.
*/
import './Search.scss';
import React, { useState, SyntheticEvent } from 'react';

interface Props {}

const Search = (props: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('search submitted with text', searchText);
    setSearchText('');
  };
  return (
    <div className='search-container'>
      <form onSubmit={e => handleSearch(e)}>
        <input
          type='text'
          name='searchbar'
          id='searchbar'
          placeholder='Search for items or users...'
          className='searchbar'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
