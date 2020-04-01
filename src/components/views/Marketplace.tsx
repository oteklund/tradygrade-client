/*
This component is the main view of the marketplace. 
*/
import './Marketplace.scss';
import React, { SyntheticEvent } from 'react';
import { StoreState, Item } from '../../models/types';
import { connect } from 'react-redux';
import MarketList from '../marketplace/MarketList';
import history from '../../history';
interface Props {
  items: Item[];
}

const Marketplace = ({ items }: Props) => {
  const handleNewItemAddition = (e: SyntheticEvent) => {
    history.push('/marketplace/new');
  };
  return (
    <div className='marketplace-container'>
      <button className='lone-button' onClick={handleNewItemAddition}>
        Add a new item to the marketplace
      </button>
      <MarketList items={items} />
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps)(Marketplace);
