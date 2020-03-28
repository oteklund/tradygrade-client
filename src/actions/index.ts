// Action creators will be here!

import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IItem, IItem2, User } from '../models/types';
import { IFetchUserActions } from './users';
// import { Authorization } from "../models/types"

export interface IFetchItemActions {
  type: ActionTypes.fetchItems;
  payload: IItem[];
}

export interface IDeleteItemActions {
  type: ActionTypes.deleteItem;
  payload: string;
}

export interface ICreateItemActions {
  type: ActionTypes.createItem;
  payload: IItem2;
}

export interface IUpdateItemActions {
  type: ActionTypes.updateItem;
  payload: IItem2;
}

export type ItemActions =
  | IFetchItemActions
  | IDeleteItemActions
  | ICreateItemActions
  | IUpdateItemActions;

const ItemUrl = 'http://localhost:4000/api/marketplace/items';

/* : ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<void>,
  // The type for the data within the last action
  IItem[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  IFetchItemActions
>>
*/

export const fetchItems = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<IItem[]>(ItemUrl);

    dispatch<IFetchItemActions>({
      type: ActionTypes.fetchItems,
      payload: response.data
    });
  };
};

export const deleteItem = (id: string) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.delete(`${ItemUrl}/${id}`);
    if (response.status === 200) {
      dispatch<IDeleteItemActions>({
        type: ActionTypes.deleteItem,
        payload: id
      });
    } else {
      console.log('Delete not successful!');
    }
  };
};
export const createItem = (item: IItem2) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post(ItemUrl, item);
    if (response.status === 201) {
      const item = await axios.get(`${ItemUrl}/${response.data.id}`);
      dispatch<ICreateItemActions>({
        type: ActionTypes.createItem,
        payload: item.data
      });
    } else {
      console.log('Create not successful!');
    }
  };
};
export const updateItem = (item: IItem2) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.put(`${ItemUrl}/${item.id}`, item);
    if (response.status === 200) {
      dispatch<IUpdateItemActions>({
        type: ActionTypes.updateItem,
        payload: item
      });
    } else {
      console.log('Create not successful!');
    }
  };
};
