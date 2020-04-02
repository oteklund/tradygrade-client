// Action creators will be here!

import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { User } from '../models/types';
import { tokenAndHeaderConfig } from "../services/util"
// import { Authorization } from "../models/types"

export interface IFetchUserActions {
  type: ActionTypes.fetchUsers;
  payload: User[];
}

export type UsersActions = IFetchUserActions;

const usersUrl = 'http://localhost:4000/api/users';

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    let headers = await tokenAndHeaderConfig()
    console.log(headers)
    const response = await axios.get<User[]>(usersUrl, {headers});

    dispatch<IFetchUserActions>({
      type: ActionTypes.fetchUsers,
      payload: response.data
    });
  };
};
