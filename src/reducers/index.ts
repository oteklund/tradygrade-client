import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { userReducer } from './user';
import { StoreState } from '../models/types';

export const rootReducer = combineReducers<StoreState>({
  items: itemsReducer,
  user: userReducer
});
