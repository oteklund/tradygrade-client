import { ThunkDispatch } from 'redux-thunk';
import * as constants from '../models/constants';
import { User } from '../models/types'
import { returnErrors } from "./errorActions"
import { tokenAndHeaderConfig, handleErrors, utilizeRefreshToken } from '../services/util';

const authUrl = "http://localhost:4000/api/auth"
const usersUrl = "http://localhost:4000/api/users"

export interface IAuthenticate {
    type: constants.AUTHENTICATE;
    payload: User
}
export interface IUnauthenticate {
    type: constants.UNAUTHENTICATE;
}
export interface IRefreshToken {
    type: constants.REFRESH_TOKEN
    payload: User
}
export function authenticate(user: User): IAuthenticate {
    return {
        type: constants.AUTHENTICATE,
        payload: user
    };
}
export function unauthenticate(): IUnauthenticate {
    return {
        type: constants.UNAUTHENTICATE
    };
}
export function RefreshToken(user: User): IRefreshToken {
    return {
        type: constants.REFRESH_TOKEN,
        payload: user
    }
}

export type AuthenticationAction = IAuthenticate | IUnauthenticate;

export function register(data: Object) {
    return async (dispatch: ThunkDispatch<any, {}, any>) => {

        //set headers including jwt token (if valid)
        const headers: any = await tokenAndHeaderConfig()
        if (headers.error) throw headers.error

        fetch(usersUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                handleErrors(data)
                dispatch({
                    type: constants.REGISTER_SUCCESS,
                    payload: data
                })
            })
            .catch(error => {
                dispatch(returnErrors(error))
                dispatch({
                    type: constants.REGISTER_FAIL,
                })
            })
    }
}

export function loadUser() {
    return async (dispatch: ThunkDispatch<any, {}, any>) => {

        const token = localStorage.getItem("token")
        const refreshToken = localStorage.getItem("refreshToken")
        if (!token && !refreshToken) return
        if (refreshToken && !token) await utilizeRefreshToken(refreshToken)

        dispatch({ type: constants.USER_LOADING })

        const headers: any = await tokenAndHeaderConfig()

        fetch(authUrl, {
            headers: headers
        })
            .then(res => {
                handleErrors(res)
                return res.json()
            })
            .then(data => {
                dispatch({
                    type: constants.USER_LOADED,
                    payload: data
                })
            })
            .catch(error => {
                dispatch(returnErrors({ ...error, id: "AUTH_ERROR" }))
                dispatch({
                    type: constants.AUTH_ERROR
                })
            })
    }
}

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
                if (!data.token) dispatch({type: constants.LOGIN_FAIL})
                if (data.token) {
                    const loggedInUser: User = {
                        id: data.id,
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        token: data.token,
                        refreshToken: data.refreshToken,
                        image_url: data.picture,
                        isAuthenticated: null,
                        isLoading: false
                    }
                    window.localStorage.setItem("token", data.token)
                    window.localStorage.setItem("refreshToken", data.refreshToken)
                    dispatch(authenticate(loggedInUser));
                }
            })
    };
}

export function logOut() {
    return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
        fetch("http://localhost:4000/api/auth/logout", { method: "DELETE" })
        window.localStorage.setItem("token", "null");
        window.localStorage.setItem("refreshToken", "null")
        dispatch({ type: constants.LOGOUT_SUCCESS });
    };
}

export function checkAuthentication() {
    return async (dispatch: ThunkDispatch<AuthenticationAction, {}, any>) => {
        const token = await window.localStorage.getItem('token');
        const body = { refreshToken: window.localStorage.getItem("refreshToken") }
        if (!token) {
            dispatch(unauthenticate())
            return
        }

        await fetch(`${authUrl}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(user => {
                if (!user.token) dispatch(unauthenticate())
                else {
                    window.localStorage.setItem("token", user.token)
                    dispatch(authenticate(user))
                }
            })
    };
}