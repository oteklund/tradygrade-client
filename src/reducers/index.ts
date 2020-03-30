import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { userReducer } from './user';
import { StoreState } from '../models/types';
import { usersReducer } from './users';

export const rootReducer = combineReducers<StoreState>({
  items: itemsReducer,
  user: userReducer,
  users: usersReducer
});
