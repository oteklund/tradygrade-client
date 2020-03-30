/*
This component displays the profile of the user
*/
import React, { useState, useEffect } from 'react';
import { StoreState, Item, User } from '../../models/types';
import { connect } from 'react-redux';
// import history from '../../history';

interface Props {
  location: any;
  users: User[];
  items: Item[];
}

const UserProfile = ({ users, items, location }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    let currentUser = users.find(user => user.name === location.state.name);
    setUser(currentUser);
  }, []);
  if (user) {
    return (
      <div className='user-profile-container'>
        <h3>{user.name}</h3>
        <div className='user-info'>
          <div>Items sold: </div>
          <div>Positive Reviews:</div>
          <div>Negative Reviews:</div>
        </div>
      </div>
    );
  } else {
    return <p>Loading details, please wait...</p>;
  }
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  users: state.users
});

export default connect(mapStateToProps)(UserProfile);
