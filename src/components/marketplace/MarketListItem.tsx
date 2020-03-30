import React from 'react';
import { Item } from '../../models/types';
import moment from 'moment';

interface Props {
  item: Item;
}

const MarketListItem = ({ item }: Props) => {
  return <div className="marketItem">
  <p>{item.item.name}/ {item.item.price}€</p>
  <img className="itemPicture" src={item.item.pictureURL} height="100px" />
  <p>Listed By: {item.seller.name}</p>
  <p className="dashDate" >{moment(item.item.listedAt).format('DD-MM-YYYY')}</p>
</div>;
};

export default MarketListItem;
