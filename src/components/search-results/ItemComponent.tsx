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
      <div>{item.item.name}</div>
      <button onClick={e => goToItem(e)}>View Item</button>
    </React.Fragment>
  );
};

export default ItemComponent;
