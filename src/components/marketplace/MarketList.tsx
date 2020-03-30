import React from 'react';
import MarketListItem from './MarketListItem';
import { Item } from '../../models/types';

interface Props {
  items: Item[];
}

const MarketList = ({ items }: Props) => {
  return (
    <div className='market-list'>
      {items.map((item: Item) => (
        <MarketListItem key={item.item.id} item={item} />
      ))}
    </div>
  );
};

export default MarketList;
