/*
This component is the navigation bar.
*/

import './Navigation.scss';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { StoreState, User } from '../models/types';
import { logOut } from '../actions/userActions';
import logo from '../pictures/tradyheadorange.png';

interface Props {
  user: User;
  logOutConnect: (logOutUser: User | null) => void;
}

const Navigation = ({ user, logOutConnect }: any) => {
  return (
    <div className='nav'>
      <ul className='main-navigation'>
        <li className='app-list-item'>
          <img src={logo} className='App-logo' alt='logo' height='40px' />
        </li>
        <li>
          <NavLink to='/home' style={{ textDecoration: 'none' }}>
            <div className='nav-item'>
              <i className='fas fa-home'></i>
              <span className='nav-text'>Home</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/marketplace' style={{ textDecoration: 'none' }}>
            <div className='nav-item'>
              <i className='fas fa-shopping-cart'></i>
              <span className='nav-text'>Market</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to='/chat' style={{ textDecoration: 'none' }}>
            <div className='nav-item'>
              <i className='fas fa-comments'></i>
              <span className='nav-text'>Chat</span>
            </div>
          </NavLink>
        </li>
      </ul>
      <ul className='account-navigation'>
        <li>
          <NavLink to='/account' style={{ textDecoration: 'none' }}>
            <div className='nav-item'>
              <i className='fas fa-user-circle'></i>
              <span className='nav-text'>My profile</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={() => logOutConnect(user)}
            to='/'
            style={{ textDecoration: 'none' }}
          >
            <div className='nav-item'>
              <i className='fas fa-sign-out-alt'></i>
              <span className='nav-text'>Log Out</span>
            </div>
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
