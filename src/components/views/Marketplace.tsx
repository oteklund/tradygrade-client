/*
This component is the main view of the marketplace. 
*/
import React from 'react';
import { StoreState, Item } from '../../models/types';
import { connect } from 'react-redux';
import MarketList from '../marketplace/MarketList';
interface Props {
  items: Item[];
}

const Marketplace = ({ items }: Props) => {
  return (
    <div className='marketplace-container'>
      <button>Add a new item to the marketplace</button>
      <MarketList items={items} />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps)(Marketplace);
