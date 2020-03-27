/*
This component enables the user to search for sales items. When the search is run, the user is redirected to the Search Results view.
*/
import './Search.scss';
import React from 'react';

interface Props {}

const Search = (props: Props) => {
  return (
    <div className='search-container'>
      <input
        type='text'
        name='searchbar'
        id='searchbar'
        placeholder='Search for items or users...'
        className='searchbar'
      />
    </div>
  );
};

export default Search;
