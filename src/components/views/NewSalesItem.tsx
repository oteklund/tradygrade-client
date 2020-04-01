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
  return (
    <div className='new-item'>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='text'
          placeholder='Enter product name'
          onChange={e => setName(e.target.value)}
        />
        <br />
        <input
          type='text'
          placeholder='Enter description'
          onChange={e => setDescription(e.target.value)}
        />
        <br />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value='Electronics'>Electronics</option>
          <option value='Sports'>Sports</option>
          <option value='Vehicles & Accessories'>Vehicles & Accessories</option>
          <option value='Fashion'>Fashion</option>
          <option value='Books, Movies & Music'>Books, Movies & Music</option>
          <option value='Collectibles'>Collectibles</option>
          <option value='Home & Garden'>Home & Garden</option>
          <option value='Health & Beauty'>Health & Beauty</option>
          <option value='Other'>Other</option>
        </select>
        <br />
        <input
          type='number'
          placeholder='Enter price'
          onChange={e => setPrice(e.target.value)}
        />
        <br />
        Enter expiration date: <br />
        <input
          type='date'
          onChange={e =>
            setExpiration(moment(e.target.value).format('YYYY-MM-DD'))
          }
        />
        <br />
        Condition: <br />
        <select
          name='condition'
          id='condition'
          onChange={e => setCondition(e.target.value)}
        >
          <option value='New'>New</option>
          <option value='Very good'>Very good</option>
          <option value='Poor'>Poor</option>
        </select>{' '}
        <br />
        <input
          type='text'
          placeholder='Enter picture URL'
          onChange={e => setPictureUrl(e.target.value)}
        />
        <br />
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
