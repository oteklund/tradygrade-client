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
      <p className='item-name-display'>{item.item.name}</p>
      <p className='item-price-display'> {item.item.price}€</p>
      <div className='market-item-picture-div'>
        <img className='market-item-picture' src={item.item.pictureURL} />
        <div className='market-item-shadow'></div>
      </div>
      <p className='market-item-listedby'>Listed By: {item.seller.name}</p>
      <p className='dash-date'>
        {moment(item.item.listedAt).format('DD-MM-YYYY')}
      </p>
    </div>
  );
};

export default MarketListItem;
