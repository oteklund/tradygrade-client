import React from 'react';
import { Item } from '../../models/types';

interface Props {
  item: Item;
}

const MarketListItem = ({ item }: Props) => {
  return <div>{item.item.name}</div>;
};

export default MarketListItem;
