/*
This component is for viewing and buying an existing item. The owner of the item may also edit item details. For posting a new item see component NewSalesItem.
*/

import './SalesItem.scss';
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { StoreState, Item, User } from '../../models/types';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../../history';
import { start } from 'repl';
import { usersReducer } from '../../reducers/users';
import { newChat, getChatID } from '../../services/chat';
// import { RouteProps } from 'react-router';

interface Props {
  match: any;
  items: Item[];
  user: User | any;
}

const SalesItem = ({ items, match, user }: Props) => {
  const [item, setItem] = useState<Item | undefined>();

  useEffect(() => {
    let matchingItem = items.find(
      (item: Item) => item.item.id == String(match.params.itemid)
    );
    setItem(matchingItem);
    //eslint-disable-next-line
  }, [match.params.id]);

  const handleChat = async (e: any) => {
    if (item && user.id) {
      try {
        let chatExists = await getChatID(user.id, item.seller.id);
        if (!chatExists) {
          let response = await newChat({
            user1: user.id,
            user2: item.seller.id
          });
          history.push(`/chat/${response.id}/${item.seller.name}`);
        } else {
          history.push(`/chat/${chatExists}/${item.seller.name}`);
        }
      } catch (error) {
        alert(
          'Something went wrong! Please try to start the chat by clicking the Chat-icon from the navigation!'
        );
      }
    }
  };

  const handleProfileClick = (e: any): void => {
    if (item) {
      let userUrlParam = item.seller.name.replace(/\s/, '');
      history.push({
        pathname: `/users/${userUrlParam}`,
        state: { name: item.seller.name }
      });
    }
  };

  const goBack = (e: any): void => {
    history.goBack();
  };

  if (item) {
    return (
      <div className='item-container'>
        <h3>{item.item.name}</h3>
        <div className='item-content'>
          <p>Seller</p>
          <div>
            {item.seller.name}
            <button onClick={e => handleProfileClick(e)}>View Profile</button>
          </div>
          <p>Description</p>
          <div>{item.item.description}</div>
          <p>Condition</p>
          <div>{item.item.condition}</div>
          <p>Listed at</p>
          <div>{moment(item.item.listedAt).format('DD-MM-YYYY')}</div>
          <p>Price</p>
          {/* <img className="itemPicture" src={item.item.pictureURL} height="200px" /> */}
          <div>
            <b>{`${item.item.price} €`}</b>
          </div>
          {item.seller.name !== user.name ? (
            <div className='sales-item-buttons-for-buyer'>
              <button>Buy Item</button>
              <button onClick={handleChat}>Chat With Seller</button>
              <br />
              <button onClick={goBack}>Go Back</button>
            </div>
          ) : (
            <div className='sales-item-buttons-for-seller'>
              <button>Edit</button>
              <button>Delete</button>
              <br />
              <button onClick={goBack}>Go Back</button>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <p>Loading, please wait...</p>;
  }
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user
});

export default connect(mapStateToProps)(SalesItem);
