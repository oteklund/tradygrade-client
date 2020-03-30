import { ThunkDispatch } from 'redux-thunk';
import * as constants from '../models/constants';
import { User } from '../models/types'

const authUrl = "http://localhost:4000/api/auth"
const usersUrl = "http://localhost:4000/api/users"

export interface IAuthenticate {
    type: constants.AUTHENTICATE;
    payload: User
}

export interface IUnauthenticate {
    type: constants.UNAUTHENTICATE;
    payload: User
}

export function authenticate(user: User): IAuthenticate {
    return {
        type: constants.AUTHENTICATE,
        payload: user
    };
}

export function unauthenticate(user: User): IUnauthenticate {
    return {
        type: constants.UNAUTHENTICATE,
        payload: user
    };
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

// TODO error handling
export function logIn(name: string, password: string) {
    return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
        let body = { name: name, password: password }
        await fetch(`${authUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    const loggedInUser: User = {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        token: data.token,
                        refreshToken: data.refreshToken,
                        image_url: data.picture,
                        isAuthenticated: null
                    }
                    dispatch(authenticate(loggedInUser));
                    window.localStorage.setItem("token", data.token)
                }
            })
    };
}

export function logOut(user: User) {
    return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
        await window.localStorage.removeItem('token');
        dispatch(unauthenticate(user));
    };
}

export function checkAuthentication(user: User) {
    return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
        const token = await window.localStorage.getItem('token');
        const formattedToken = typeof token === 'string' ? token : null;

        formattedToken ? dispatch(authenticate(user)) : dispatch(unauthenticate(user));
    };
}
