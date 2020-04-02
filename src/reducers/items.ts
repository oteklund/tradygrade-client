// import { IFetchItemActions } from '../actions';
import { Item } from '../models/types';
import { ActionTypes } from '../actions/types';
import { ItemActions } from '../actions';

// Korjaa any, kun ehdit!

export const itemsReducer = (state: Item[] = [], action: any) => {
  switch (action.type) {
    case ActionTypes.fetchItems:
      return action.payload;
    case ActionTypes.createItem:
      return [action.payload, ...state];
    case ActionTypes.deleteItem:
      return state.filter(item => item.item.id !== action.payload);
    case ActionTypes.updateItem:
      return state.map(item =>
        item.item.id === action.payload.item.id ? action.payload : item
      );
    default:
      return state;
  }
};
