/*
This component enables the user to search for sales items. When the search is run, the user is redirected to the Search Results view.
*/
import './Search.scss';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { History, LocationState } from 'history';
import { User, StoreState, Item } from '../../models/types';
import { connect } from 'react-redux';

interface Props {
  history: History<LocationState>;
  users: User[];
  items: Item[];
}

const Search = ({ history, users, items }: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<Array<any>>([]);
  const [filteredItems, setFilteredItems] = useState<Array<any>>([]);

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearchText('');
    history.push({
      pathname: '/marketplace/search',
      state: { filteredUsers, filteredItems }
    });
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
    let matchingUsers: User[] = users.filter((user: User) => {
      if (
        user.name
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
      ) {
        return user;
      }
    });
    let matchingItems: Item[] = items.filter((item: Item) => {
      if (
        item.item.name
          .toLowerCase()
          .trim()
          .includes(searchText.toLowerCase().trim())
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
      </form>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  users: state.users,
  items: state.items
});

export default connect(mapStateToProps)(Search);
