import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { IItem } from '../actions';
import { authReducer } from './auth';
import { Authorization } from "../models/types"

export interface StoreState {
  items: IItem[];
  auth: Authorization
}

export const reducers = combineReducers<StoreState>({
  items: itemsReducer,
  auth: authReducer
});
