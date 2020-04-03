import React from 'react';
import { Item } from '../../models/types';
import history from '../../history';

interface Props {
  item: Item;
}

const ItemComponent = ({ item }: Props) => {
  const goToItem = (e: any): void => {
    history.push(`/marketplace/${item.item.id}`);
  };
  return (
    <React.Fragment>
      <div className='product-list-item'>
        <div>{item.item.name}</div>
        <button className='result-button' onClick={e => goToItem(e)}>
          View Item
        </button>
      </div>
    </React.Fragment>
  );
};

export default ItemComponent;
