// Action creators will be here!

import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { ThunkDispatch } from "redux-thunk"
import * as constants from "../models/constants"
import { Authorization } from "../models/types"

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


// authentication-related actions
export interface IAuthenticate {
  type: constants.AUTHENTICATE
}
export function authenticate(): IAuthenticate {
  return {
    type: constants.AUTHENTICATE,
  };
}

export interface IUnauthenticate {
  type: constants.UNAUTHENTICATE
}
export function unauthenticate(): IUnauthenticate {
  return {
    type: constants.UNAUTHENTICATE,
  };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate

export function logIn() {
  return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) =>
  {
    await window.localStorage.setItem("token", "placeholder token")
    dispatch(authenticate())
  }
}

export function logOut() {
  return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) =>
  {
    await window.localStorage.setItem("token", "null")
    dispatch(unauthenticate())
  }
}

export function checkAuthentication() {
  return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) =>
  {
    const token = await window.localStorage.getItem("token")
    const formattedToken = typeof token === "string" ?
    JSON.parse(token) :
    null

    formattedToken ? dispatch(authenticate()) : dispatch(unauthenticate())
  }
}