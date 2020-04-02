/*
This component displays paginated results of a search. 
*/
import './SearchResults.scss';
import React, { useEffect, useState } from 'react';
import { StoreState, Item } from '../../models/types';
import { connect } from 'react-redux';
import UsersList from '../search-results/UsersList';
import ItemsList from '../search-results/ItemsList';

interface Props {
  location: any;
  items: Item[];
}

const SearchResults = ({ location }: Props) => {
  const [showProductsOnly, setShowProductsOnly] = useState<Boolean>(false);
  const [showUsersOnly, setshowUsersOnly] = useState<Boolean>(false);

  useEffect(() => {
    setShowProductsOnly(false);
    setshowUsersOnly(false);
  }, [location.state.filteredItems, location.state.filteredUsers]);

  const handleFilter = (e: any) => {
    if (e.target.innerText === 'Products') {
      setShowProductsOnly(true);
      setshowUsersOnly(false);
    } else {
      setShowProductsOnly(false);
      setshowUsersOnly(true);
    }
  };
  return (
    <div className='result-container'>
      <span>Show me only:</span>
      <button className='filter-button' onClick={e => handleFilter(e)}>
        Products
      </button>
      <button className='filter-button' onClick={e => handleFilter(e)}>
        Users
      </button>
      <div className="users-and-items">
      {showProductsOnly && <ItemsList items={location.state.filteredItems} />}
      {showUsersOnly && <UsersList users={location.state.filteredUsers} />}
      {!showUsersOnly && !showProductsOnly && (
        <React.Fragment>
          <ItemsList items={location.state.filteredItems} />
          <UsersList users={location.state.filteredUsers} />
        </React.Fragment>
      )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps)(SearchResults);
