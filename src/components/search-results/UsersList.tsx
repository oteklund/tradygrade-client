import React from 'react';
import { User } from '../../models/types';

interface Props {
  users: User[];
}

const UsersList = ({ users }: Props) => {
  return (
    <div>
      <h3>Matching users</h3>
      {users.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UsersList;
