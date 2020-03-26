/*
This component is the navigation bar.
*/

import './Navigation.scss';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StoreState, User } from '../models/types';
import { logOut } from '../actions';

interface Props {
  isAuthenticated: boolean | null;
  token: string | null;
  user: User | null;
  logOutConnect: () => void;
}

const Navigation = ({ isAuthenticated, user, logOutConnect }: Props) => {
  const links = isAuthenticated ? (
    <div className='nav'>
      <li>
        <NavLink to='/home'>home</NavLink>
      </li>
      <li>
        <NavLink to='/marketplace'>marketplace</NavLink>
      </li>
      <li>
        <NavLink to='/chat'>chats</NavLink>
      </li>
    </div>
  ) : (
    <div className='nav'>
      <li>
        <NavLink to='/'>landing</NavLink>
      </li>
      <li>
        <NavLink to='/about'>about</NavLink>
      </li>
    </div>
  );
  const profileLinks = isAuthenticated ? (
    <div className='nav'>
      <li>
        <NavLink to='/account'>account</NavLink>
      </li>
      <li>
        <NavLink onClick={logOutConnect} to='/'>
          log out
        </NavLink>
      </li>
    </div>
  ) : null;

  return (
    <div className='nav'>
      <p>
        {isAuthenticated
          ? `Logged in user: ${user ? user.username : 'Bob'}`
          : `Logged out`}
      </p>
      <div>
        <ul>{links}</ul>
        <ul>{profileLinks}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token,
  user: state.auth.user
});

const mapDispatchToProps = {
  logOutConnect: logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
