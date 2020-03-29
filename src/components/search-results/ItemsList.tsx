import React from 'react';
import { Item } from '../../models/types';

interface Props {
  items: Item[];
}

const ItemsList = ({ items }: Props) => {
  return (
    <div>
      <h3>Matching products</h3>
      {items.map((item: Item) => (
        <div key={item.item.id}>{item.item.name}</div>
      ))}
    </div>
  );
};

export default ItemsList;
