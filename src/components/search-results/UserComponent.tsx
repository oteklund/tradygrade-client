import React, { SyntheticEvent } from 'react';
import history from '../../history';
import { User } from '../../models/types';
import '../views/SearchResults.scss';
import { getChatID, newChat } from '../../services/chat';

interface Props {
  user: User;
}

const UserComponent = ({ user }: Props) => {
  const handleChat = async (e: SyntheticEvent) => {
    console.log(
      "We didn't have time to implement this feature. It will be here soon!"
    );
  };
  const handleProfileClick = (e: SyntheticEvent): void => {
    history.push({
      pathname: `/users/${user.name}`
    });
  };
  return (
    <div id='user-list-item' key={user.id}>
      <span>{user.name}</span>
      <button className='result-button' onClick={handleChat}>
        Chat
      </button>
      <button className='result-button' onClick={e => handleProfileClick(e)}>
        View Profile
      </button>
    </div>
  );
};

export default UserComponent;
