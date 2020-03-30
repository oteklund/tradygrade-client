import React from 'react';
import history from '../../history';
import { User } from '../../models/types';
import '../views/SearchResults.scss';

interface Props {
  user: User;
}

const UserComponent = ({ user }: Props) => {
  const handleProfileClick = (e: any): void => {
    let userUrlParam = user.name.replace(/\s/, '');
    history.push({
      pathname: `/users/${userUrlParam}`,
      state: { name: user.name }
    });
  };
  return (
    <div id='user-list-item' key={user.id}>
      <span>{user.name}</span>
      <button>Chat</button>
      <button onClick={e => handleProfileClick(e)}>View Profile</button>
    </div>
  );
};

export default UserComponent;
