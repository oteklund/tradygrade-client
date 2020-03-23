import { Item } from './Item';

// export const ADD_USER = 'ADD_USER';
// export const DELETE_USER = 'DELETE_USER';

export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SET_ITEMS = 'SET_ITEMS';

export interface SetItemAction {
  type: typeof SET_ITEMS;
  items: Item[];
}

export interface EditItemAction {
  type: typeof EDIT_ITEM;
  item: Item;
}
export interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  id: string;
}

export interface AddItemAction {
  type: typeof ADD_ITEM;
  item: Item;
}

export type ItemActionTypes =
  | SetItemAction
  | EditItemAction
  | DeleteItemAction
  | AddItemAction;

//Kaikki actionit tähän! Eli tulee OR-operaattorilla kuten yllä

export type AppActions = ItemActionTypes;
