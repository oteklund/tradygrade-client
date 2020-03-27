/*
This component is the navigation bar.
*/

import './Navigation.scss';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StoreState, User } from '../models/types';
import { logOut } from '../actions/userActions';

interface Props {
  user: User;
  logOutConnect: (logOutUser: User | null) => void;
}

const Navigation = ({ user, logOutConnect }: any) => {
  return (
    <div className='nav'>
      <ul className="main-navigation">
        <li>
          <NavLink to='/home'>home</NavLink>
        </li>
        <li>
          <NavLink to='/marketplace'>marketplace</NavLink>
        </li>
        <li>
          <NavLink to='/chat'>chats</NavLink>
        </li>
      </ul>
      <ul className="account-navigation">
        <li>
          <NavLink to='/account'>account</NavLink>
        </li>
        <li>
          <NavLink onClick={() => logOutConnect(user)} to='/'>
            log out
       </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user
});

const mapDispatchToProps = {
  logOutConnect: logOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
