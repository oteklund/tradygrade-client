import '../views/SearchResults.scss';
import React from 'react';
import { User } from '../../models/types';
import history from '../../history';
import UserComponent from './UserComponent';

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  return (
    <div className="users-search-list">
      <h3>Matching users</h3>
      {users.map((user: User) => (
        <UserComponent user={user} />
      ))}
    </div>
  );
};

export default UsersList;
