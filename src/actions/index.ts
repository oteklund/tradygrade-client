// Action creators will be here!

import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface IItem {
  id: string;
  title: string;
  description: string;
  sold: boolean;
  seller: string;
  category: string;
  price: number;
  listedAt: Date;
  expires: Date;
  condition: string;
}

export interface IFetchItemActions {
  type: ActionTypes.fetchItems;
  payload: IItem[];
}

const url = 'http://localhost:4000/api/items';

export const fetchItems = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<IItem[]>(url);

    dispatch<IFetchItemActions>({
      type: ActionTypes.fetchItems,
      payload: response.data
    });
  };
};
