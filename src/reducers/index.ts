import { combineReducers } from 'redux';
import { itemsReducer } from './items';
import { IItem } from '../actions';

export interface StoreState {
  items: IItem[];
}

export const reducers = combineReducers<StoreState>({
  items: itemsReducer
});
