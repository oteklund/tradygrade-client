import React from 'react';
import { Item } from '../../models/types';
import { Router } from 'react-router-dom';
import ItemComponent from './ItemComponent';

interface Props {
  items: Item[];
}

const ItemsList = ({ items }: Props) => {
  return (
    <div className="items-search-list">
      <h3>Matching products</h3>
      {items.map((item: Item) => (
        <ItemComponent key={item.item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemsList;
