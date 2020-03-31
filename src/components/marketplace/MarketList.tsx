import './MarketList.scss';
import React from 'react';
import MarketListItem from './MarketListItem';
import { Item } from '../../models/types';
import RangeSlider from './RangeSlider';

interface Props {
  items: Item[];
}

const MarketList = ({ items }: Props) => {
  return (
    <div className='market-list'>
      <div className='filter-box'>
        <h3>Filters</h3>
        <div className='filter-settings'>
          <div className='sort-by'>
            <label>Sort by </label>
            <select>
              <option value='new'>Newly listed</option>
              <option value='new'>Alphabetical</option>
              <option value='high'>Highest price</option>
              <option value='low'>Lowest price</option>
            </select>
          </div>
          <div className='category-filter'>
            <label>Category</label>
            <select>
              <option value='electronics'>Electronics</option>
              <option value='sports'>Sports</option>
              <option value='vehicles'>Vehicles & Accessories</option>
              <option value='fashion'>Fashion</option>
              <option value='booksmoviesmusic'>Books, Movies & Music</option>
              <option value='collectibles'>Collectibles</option>
              <option value='homegarden'>Home & Garden</option>
              <option value='healthbeauty'>Health & Beauty</option>
              <option value='others'>Others</option>
            </select>
          </div>
          <div className='price-filter'>
            <RangeSlider />
          </div>
        </div>
      </div>
      {items.map((item: Item) => (
        <MarketListItem key={item.item.id} item={item} />
      ))}
    </div>
  );
};

export default MarketList;
