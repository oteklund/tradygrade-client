import { User } from '../models/types';
import { ActionTypes } from '../actions/types';
import { UsersActions } from '../actions/users';

export const usersReducer = (state: User[] = [], action: UsersActions) => {
  switch (action.type) {
    case ActionTypes.fetchUsers:
      return action.payload;
    default:
      return state;
  }
};
