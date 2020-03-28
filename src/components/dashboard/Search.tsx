/*
This component enables the user to search for sales items. When the search is run, the user is redirected to the Search Results view.
*/
import './Search.scss';
import React, { useState } from 'react';
import { History, LocationState } from 'history';
import { User, StoreState, IItem } from '../../models/types';
import { connect } from 'react-redux';

interface Props {
  history: History<LocationState>;
  users: User[];
  items: IItem[];
}

const Search = (props: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<Array<any>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<any>>([]);

  const handleSearch = (e: any): void => {
    e.preventDefault();
    console.log('search submitted with text', searchText);
    setSearchText('');
    props.history.push({
      pathname: '/marketplace/search',
      state: { filteredUsers, filteredItems }
    });
  };

  const handleSearchChange = (e: any): void => {
    setSearchText(e.target.value);
    let matchingUsers: User[] = props.users.filter(user => {
      if (
        user.name
          .toLowerCase()
          .trim()
          .includes(e.target.value)
      ) {
        return user;
      }
    });
    let matchingItems: IItem[] = props.items.filter(item => {
      if (
        item.item.name
          .toLowerCase()
          .trim()
          .includes(e.target.value)
      ) {
        return item;
      }
    });
    setFilteredUsers(matchingUsers);
    setFilteredItems(matchingItems);
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
          onChange={e => handleSearchChange(e)}
        />
        {/* <button type='submit'>
          <i className='fas fa-search'></i>
        </button> */}
      </form>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  users: state.users,
  items: state.items
});

export default connect(mapStateToProps)(Search);
