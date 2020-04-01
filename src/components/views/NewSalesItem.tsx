/*
This component allows users to post a new item they wish to sell.
*/
import './NewSalesItem.scss';
import React, { useState, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { StoreState, Item2, User } from '../../models/types';
import { createItem } from '../../actions/';
import moment from 'moment';
import history from '../../history';
import { TextField, Select, MenuItem, InputLabel } from '@material-ui/core';

interface Props {
  // createItem: (item: Item2) => Promise<void>;
  createItem: (item: Item2) => Promise<void>;
  user: any;
}

const NewSalesItem = ({ createItem, user }: Props) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Electronics');
  const [price, setPrice] = useState<string>('');
  const [expiration, setExpiration] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [condition, setCondition] = useState<string>('');
  const [pictureUrl, setPictureUrl] = useState<string>('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createItem({
      name,
      description,
      sold: false,
      category,
      sellerId: user.id,
      price: parseFloat(price),
      listedAt: new Date(),
      expires: new Date(expiration),
      condition,
      pictureURL: pictureUrl
    });
    history.push('/home');
  };

  const handleCategoryChange = (e: any): void => {
    setCategory(e.target.value);
  };

  const handleConditionChange = (e: any): void => {
    setCondition(e.target.value);
  };
  return (
    <div className='new-item'>
      <form className='new-item-form' onSubmit={e => handleSubmit(e)}>
        <h2>Add a new product</h2>
        <div className='input-group-new'>
          <TextField
            id='product-name'
            label='Product Name'
            // error
            helperText='Helper'
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='input-group-new'>
          <TextField
            id='product-description'
            label='Description'
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className='input-group-new'>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            value={category}
            labelId='category-label'
            onChange={handleCategoryChange}
          >
            <MenuItem value='Electronics'>Electronics</MenuItem>
            <MenuItem value='Sports'>Sports</MenuItem>
            <MenuItem value='Vehicles & Accessories'>
              Vehicles & Accessories
            </MenuItem>
            <MenuItem value='Fashion'>Fashion</MenuItem>
            <MenuItem value='Books, Movies & Music'>
              Books, Movies & Music
            </MenuItem>
            <MenuItem value='Collectibles'>Collectibles</MenuItem>
            <MenuItem value='Home & Garden'>Home & Garden</MenuItem>
            <MenuItem value='Health & Beauty'>Health & Beauty</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
        </div>
        <div className='input-group-new'>
          <TextField
            id='product-price'
            label='Price'
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className='input-group-new'>
          <InputLabel>Expiration date</InputLabel>
          <TextField
            type='date'
            onChange={e =>
              setExpiration(moment(e.target.value).format('YYYY-MM-DD'))
            }
          />
        </div>
        <div className='input-group-new'>
          <InputLabel id='item-condition'>Condition</InputLabel>
          <Select
            labelId='item-condition'
            name='condition'
            id='condition'
            onChange={handleConditionChange}
          >
            <MenuItem value='New'>New</MenuItem>
            <MenuItem value='Very good'>Very good</MenuItem>
            <MenuItem value='Poor'>Poor</MenuItem>
          </Select>
        </div>
        <div className='input-group-new'>
          <TextField
            id='product-picture'
            label='Picture URL'
            onChange={e => setPictureUrl(e.target.value)}
          />
        </div>
        <button className='itemButton' type='submit'>
          Submit
        </button>
        <button
          className='itemButton'
          onClick={e => {
            e.preventDefault();
            history.push('/marketplace');
          }}
        >
          Go Back
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items,
  user: state.user
});

export default connect(mapStateToProps, { createItem })(NewSalesItem);
