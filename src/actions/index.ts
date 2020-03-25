// Action creators will be here!

import axios from 'axios';
import { Dispatch, ActionCreator } from 'redux';
import { ActionTypes } from './types';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import * as constants from '../models/constants';
import { IItem } from '../models/types';
// import { Authorization } from "../models/types"

export interface IFetchItemActions {
  type: ActionTypes.fetchItems;
  payload: IItem[];
}

export interface IDeleteItemActions {
  type: ActionTypes.deleteItem;
  payload: number;
}

export interface ICreateItemActions {
  type: ActionTypes.createItem;
  payload: IItem;
}

const ItemUrl = 'http://localhost:4000/api/marketplace/items';

export const fetchItems: ActionCreator<ThunkAction<
  // The type of the last action to be dispatched - will always be promise<T> for async actions
  Promise<void>,
  // The type for the data within the last action
  IItem[],
  // The type of the parameter for the nested function
  null,
  // The type of the last action to be dispatched
  IFetchItemActions
>> = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<IItem[]>(ItemUrl);

    dispatch<IFetchItemActions>({
      type: ActionTypes.fetchItems,
      payload: response.data
    });
  };
};

export const deleteItem = (id: number) => {
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
export const createItem = (item: IItem) => {
  return async (dispatch: Dispatch) => {
    const response = await axios.post(ItemUrl);
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

// authentication-related actions
export interface IAuthenticate {
  type: constants.AUTHENTICATE;
}
export function authenticate(): IAuthenticate {
  return {
    type: constants.AUTHENTICATE
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE;
}
export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function logIn() {
  return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
    await window.localStorage.setItem('token', 'placeholder token');
    dispatch(authenticate());
  };
}

export function logOut() {
  return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
    await window.localStorage.setItem('token', 'null');
    dispatch(unauthenticate());
  };
}

export function checkAuthentication() {
  return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
    const token = await window.localStorage.getItem('token');
    const formattedToken = typeof token === 'string' ? token : null;

    formattedToken ? dispatch(authenticate()) : dispatch(unauthenticate());
  };
}
