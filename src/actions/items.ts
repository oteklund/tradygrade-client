import {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  SET_ITEMS,
  AppActions
} from '../types/actions';
import { Item } from '../types/Item';

export const addItem = (item: Item): AppActions => ({
  type: ADD_ITEM,
  item
});
export const deleteItem = (id: string): AppActions => ({
  type: DELETE_ITEM,
  id
});
export const editItem = (item: Item): AppActions => ({
  type: EDIT_ITEM,
  item
});
export const setItems = (items: Item[]): AppActions => ({
  type: SET_ITEMS,
  items
});
