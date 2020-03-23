import {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  SET_ITEMS,
  ItemActionTypes
} from '../types/actions';
import { Item } from '../types/Item';

const initialState: Item[] = [];

const itemsReducer = (
  state = initialState,
  action: ItemActionTypes
): Item[] => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    case EDIT_ITEM:
      return state.map(item => {
        if (item.id === action.item.id) {
          return {
            ...item,
            ...action.item
          };
        } else {
          return item;
        }
      });
    case DELETE_ITEM:
      return state.filter(({ id }) => id !== action.id);
    case SET_ITEMS:
      return action.items;
    default:
      return state;
  }
};

export { itemsReducer };
