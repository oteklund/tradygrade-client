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
  const [condition, setCondition] = useState<string>('New');
  const [pictureUrl, setPictureUrl] = useState<string>('');

  //Errors! These values are used for displaying the errors in the UI!
  const [nameError, setNameError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);
  const [conditionError, setConditionError] = useState<boolean>(false);

  let today = new Date().valueOf();
  let twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

  //These values are used to assess the user input validity even before submit, so that we don't have to deal with asynchronicity issues!

  let initialNameError: boolean = name.length < 2 || name.length > 50;
  let initialDescriptionError: boolean = description.length === 0;
  let initialDateError: boolean =
    new Date(expiration).valueOf() < today ||
    new Date(expiration).valueOf() > twoMonthsFromNow.valueOf();
  let initialPriceError: boolean =
    typeof parseInt(price) !== 'number' ||
    parseInt(price) < 0 ||
    parseInt(price) > 30000;
  let initialConditionError: boolean = condition.length === 0;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    //Setting the error messages for the UI:
    setNameError(name.length < 2 || name.length > 50);
    setDescriptionError(description.length === 0);
    setDateError(
      new Date(expiration).valueOf() < today ||
        new Date(expiration).valueOf() > twoMonthsFromNow.valueOf()
    );
    setPriceError(
      typeof parseInt(price) !== 'number' ||
        parseInt(price) < 0 ||
        parseInt(price) > 30000
    );
    setConditionError(condition.length === 0);

    //Checking if errors found:

    if (
      initialNameError ||
      initialDescriptionError ||
      initialPriceError ||
      initialDateError ||
      initialConditionError
    ) {
      return;
    } else {
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
    }
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
            error={nameError}
            helperText={
              nameError ? 'Name needs to be 2-50 characters long!' : null
            }
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className='input-group-new'>
          <TextField
            id='product-description'
            label='Description'
            error={descriptionError}
            helperText={
              descriptionError ? 'Description cannot be blank!' : null
            }
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
            label='Price (€)'
            error={priceError}
            helperText={
              priceError ? 'Price must be a number between 0-30000€!' : null
            }
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className='input-group-new'>
          <InputLabel>Expiration date</InputLabel>
          <TextField
            type='date'
            error={dateError}
            helperText={
              dateError
                ? 'Date must be a date within the next two months'
                : null
            }
            onChange={e =>
              setExpiration(moment(e.target.value).format('YYYY-MM-DD'))
            }
          />
        </div>
        <div className='input-group-new'>
          <InputLabel id='item-condition'>Condition</InputLabel>
          <Select
            labelId='item-condition'
            value={condition}
            id='condition'
            onChange={handleConditionChange}
            error={conditionError}
          >
            <MenuItem value='New'>New</MenuItem>
            <MenuItem value='Like new'>Like new</MenuItem>
            <MenuItem value='Very good'>Very good</MenuItem>
            <MenuItem value='Good'>Good</MenuItem>
            <MenuItem value='Acceptable'>Acceptable</MenuItem>
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
        <button className='item-button' type='submit'>
          Submit
        </button>
        <button
          className='item-button'
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
