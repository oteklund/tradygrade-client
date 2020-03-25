// import { IFetchItemActions } from '../actions';
import { IItem } from '../models/types';
import { ActionTypes } from '../actions/types';

// Korjaa any, kun ehdit!

export const itemsReducer = (state: IItem[] = [], action: any) => {
  switch (action.type) {
    case ActionTypes.fetchItems:
      return action.payload;
    case ActionTypes.createItem:
      return [...state, action.payload];
    case ActionTypes.deleteItem:
      return state.filter(item => item.item.id !== action.payload);
    case ActionTypes.updateItem:
      return state.map(item =>
        item.item.id === action.payload.id ? action.payload : item
      );
    default:
      return state;
  }
};
