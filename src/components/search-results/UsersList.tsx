import '../views/SearchResults.scss';
import React from 'react';
import { User } from '../../models/types';

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  const handleProfileClick = (e: any): void => {
    
  };
  return (
    <div>
      <h3>Matching users</h3>
      {users.map((user: User) => (
        <div id='user-list-item' key={user.id}>
          <span>{user.name}</span>
          <button>Chat</button>
          <button onClick={e => handleProfileClick(e)}>View Profile</button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
