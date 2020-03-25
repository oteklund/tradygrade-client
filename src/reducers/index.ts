import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { authReducer } from './auth';
import { StoreState } from '../models/types';

export const rootReducer = combineReducers<StoreState>({
  items: itemsReducer,
  auth: authReducer
});
