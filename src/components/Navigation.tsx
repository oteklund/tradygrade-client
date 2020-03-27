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
      <ul className='main-navigation'>
        <li>
          <NavLink to='/home'>
            <i className='fas fa-home'></i>
            <span className='nav-text'>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/marketplace'>
            <i className='fas fa-shopping-cart'></i>
            <span className='nav-text'>Market</span>
          </NavLink>
        </li>
        <li>
          <NavLink to='/chat'>
            <i className='fas fa-comments'></i>
            <span className='nav-text'>Chat</span>
          </NavLink>
        </li>
      </ul>
      <ul className='account-navigation'>
        <li>
          <NavLink to='/account'>
            <i className='fas fa-user-circle'></i>
            <span className='nav-text'>My profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink onClick={() => logOutConnect(user)} to='/'>
            <i className='fas fa-sign-out-alt'></i>
            <span className='nav-text'>Log Out</span>
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
