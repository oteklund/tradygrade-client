/*
This component is for viewing and buying an existing item. The owner of the item may also edit item details. For posting a new item see component NewSalesItem.
*/
import React, { useState, useEffect } from 'react';
import { StoreState, Item } from '../../models/types';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../../history';
// import { RouteProps } from 'react-router';

interface Props {
  match: any;
  items: Item[];
}

const SalesItem = ({ items, match }: Props) => {
  const [item, setItem] = useState<Item | undefined>();

  useEffect(() => {
    let matchingItem = items.find((item: Item) => {
      return item.item.id === match.params.id, 10;
    });
    setItem(matchingItem);
  });

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
          <div>
            <b>{`${item.item.price} €`}</b>
          </div>
          <button>Buy Item</button>
          <button>Chat With Seller</button> <br />
          <button onClick={goBack}>Go Back</button>
        </div>
      </div>
    );
  } else {
    return <p>Loading, please wait...</p>;
  }
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps)(SalesItem);
