import './MarketList.scss';
import React, { useState, useEffect } from 'react';
import MarketListItem from './MarketListItem';
import { Item } from '../../models/types';
import RangeSlider from './RangeSlider';

interface Props {
  items: Item[];
}

const MarketList = ({ items }: Props) => {
  const [filteredItems, setFilteredItems] = useState<Array<any>>([]);
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('new');

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };
  const handleSortChange = (e: any): void => {
    setSortBy(e.target.value);
    switch (sortBy) {
      case 'new':
        let sortedArray = filteredItems.sort((a, b) => {
          return (
            new Date(b.item.listedAt).valueOf() -
            new Date(a.item.listedAt).valueOf()
          );
        });
        setFilteredItems(sortedArray);

        break;
      case 'asc':
        let ascArray = filteredItems.sort((a, b) =>
          a.item.name.toLowerCase().localeCompare(b.item.name.toLowerCase())
        );
        setFilteredItems(ascArray);
        break;
      case 'high':
        let sortByHigh = filteredItems.sort((a, b) => {
          return b.item.price - a.item.price;
        });
        setFilteredItems(sortByHigh);
        break;
      case 'low':
        let sortByLow = filteredItems.sort((a, b) => {
          return b.item.price - a.item.price;
        });
        setFilteredItems(sortByLow);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setFilteredItems(items);
    setSortBy('new');
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (category) {
      case 'Sports':
        let sportsArray = items.filter(
          (item: Item) => item.item.category === 'Sports'
        );
        setFilteredItems(sportsArray);
        break;
      case 'Electronics':
        let itemArr = items.filter(
          (item: Item) => item.item.category === 'Electronics'
        );
        console.log(itemArr);
        setFilteredItems(itemArr);
        break;
      case 'Vehicles & Accessories':
        let vehicleArray = items.filter(
          (item: Item) => item.item.category === 'Vehicles & Accessories'
        );
        setFilteredItems(vehicleArray);
        break;
      case 'Books, Movies & Music':
        let booksArray = items.filter(
          (item: Item) => item.item.category === 'Books, Movies & Music'
        );
        setFilteredItems(booksArray);
        break;
      case 'Fashion':
        let fashionArray = items.filter(
          (item: Item) => item.item.category === 'Fashion'
        );
        setFilteredItems(fashionArray);
        break;
      case 'Collectibles':
        let collectiblesArray = items.filter(
          (item: Item) => item.item.category === 'Collectibles'
        );
        setFilteredItems(collectiblesArray);
        break;
      case 'Home & Garden':
        let homeArray = items.filter(
          (item: Item) => item.item.category === 'Home & Garden'
        );
        setFilteredItems(homeArray);
        break;
      case 'Health & Beauty':
        let beautyArray = items.filter(
          (item: Item) => item.item.category === 'Health & Beauty'
        );
        setFilteredItems(beautyArray);
        break;
      case 'Other':
        let otherArray = items.filter(
          (item: Item) => item.item.category === 'Other'
        );
        setFilteredItems(otherArray);
        break;

      default:
        setFilteredItems(items);
        break;
    }
  }, [category]);

  return (
    <div className='market-list'>
      <div className='filter-box'>
        <h3>Filters</h3>
        <div className='filter-settings'>
          <div className='sort-by'>
            <label>Sort by </label>
            <select value={sortBy} onChange={handleSortChange}>
              <option value='new'>Newly listed</option>
              <option value='asc'>Alphabetical</option>
              <option value='high'>Highest price</option>
              <option value='low'>Lowest price</option>
            </select>
          </div>
          <div className='category-filter'>
            <label>Category</label>
            <select value={category} onChange={handleCategoryChange}>
              <option value='all'>All</option>
              <option value='Electronics'>Electronics</option>
              <option value='Sports'>Sports</option>
              <option value='Vehicles & Accessories'>
                Vehicles & Accessories
              </option>
              <option value='Fashion'>Fashion</option>
              <option value='Books, Movies & Music'>
                Books, Movies & Music
              </option>
              <option value='Collectibles'>Collectibles</option>
              <option value='Home & Garden'>Home & Garden</option>
              <option value='Health & Beauty'>Health & Beauty</option>
              <option value='Other'>Others</option>
            </select>
          </div>
          <div className='price-filter'>
            <RangeSlider />
          </div>
        </div>
      </div>
      {filteredItems.map((item: Item) => (
        <MarketListItem key={item.item.id} item={item} />
      ))}
    </div>
  );
};

export default MarketList;
