import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StoreState, Item } from '../models/types';
import { deleteItem, updateItem, createItem } from '../actions/index';
import moment from 'moment';

interface Props {
  deleteItem: (id: string) => Promise<void>;
  updateItem: any;
  createItem: any;
  items: Item[];
}

const ItemPlayground = ({
  items,
  deleteItem,
  updateItem,
  createItem
}: Props) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [sellerId, setSellerId] = useState<string | number>(0);
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<number | string>(0);
  const [expiration, setExpiration] = useState<string>(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [condition, setCondition] = useState<string>('');
  const [pictureUrl, setPictureUrl] = useState<string>('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createItem({
      name,
      description,
      sold: false,
      sellerId,
      category,
      price,
      listedAt: new Date(),
      expires: new Date(expiration),
      condition,
      pictureURL: pictureUrl
    });
  };
  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type='number'
          placeholder='Seller id'
          onChange={e => setSellerId(e.target.value)}
        />
        <br />
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
        <input
          type='text'
          placeholder='Enter category'
          onChange={e => setCategory(e.target.value)}
        />
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
        <button type='submit'>Add to DB</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.item.id}>
            {item.item.name}
            <button onClick={() => deleteItem(item.item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = {
  deleteItem,
  updateItem,
  createItem
};

const mapStateToProps = (state: StoreState) => ({
  items: state.items
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPlayground);
