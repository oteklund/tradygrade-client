/*
This component makes up the front page of the site. Users who have logged on are redirected here when accessing the root url.
*/
import './Dashboard.scss';
import React, { useState, useEffect } from 'react';
import { StoreState, Item, User } from '../../models/types';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../../history';

interface Props {
  user: User | undefined;
  items: Item[];
}

const Dashboard = ({ user, items }: Props) => {
  return (
    <div className='dashboard'>
      {user ? (
        <div className='welcome'>{`Welcome, ${user.name}!`}</div>
      ) : (
        <div>WTF?</div>
      )}
      <p>Latest 5 items added to the marketplace:</p>
      <div className='latest-items'>
        {items
          .sort((a, b) => {
            return (
              new Date(b.item.listedAt).valueOf() -
              new Date(a.item.listedAt).valueOf()
            );
          })
          .map((item, index) => {
            if (index < 5) {
              return (
                <div
                  className='dash-item'
                  key={item.item.id}
                  onClick={e => history.push(`/marketplace/${item.item.id}`)}
                >
                  <p>
                    {item.item.name}/ {item.item.price}€
                  </p>
                  <img
                    className='item-picture'
                    src={item.item.pictureURL}
                    height='100px'
                  />
                  <p>Listed By: {item.seller.name}</p>
                  <p className='dash-date'>
                    {moment(item.item.listedAt).format('DD-MM-YYYY')}
                  </p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
