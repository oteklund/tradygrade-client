import React from 'react';
import { Item } from '../../models/types';
import moment from 'moment';
import history from '../../history';
import { Router } from 'react-router-dom';

interface Props {
  item: Item;
}

const MarketListItem = ({ item }: Props) => {
  const handlePush = (e: any): void => {
    history.push(`/marketplace/${item.item.id}`);
  };
  return (
    <div className='market-item' onClick={handlePush}>
      <p>
        {item.item.name}/ {item.item.price}€
      </p>
      <img className='item-picture' src={item.item.pictureURL} height='100px' />
      <p>Listed By: {item.seller.name}</p>
      <p className='dash-date'>
        {moment(item.item.listedAt).format('DD-MM-YYYY')}
      </p>
    </div>
  );
};

export default MarketListItem;
