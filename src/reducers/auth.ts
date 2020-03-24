import { IAuthenticate, IUnauthenticate } from "../actions/index"
import { AUTHENTICATE, UNAUTHENTICATE } from "../models/constants"
import { Authorization } from "../models/types"

export function authReducer(
    state: Authorization = {
        token: null,
        isAuthenticated: null,
        user: null
    },
    action: IAuthenticate | IUnauthenticate,
): Authorization {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state, 
                token: "placeholder-token", 
                isAuthenticated: true, 
                user: { 
                    username: "Dummyname Reducerson",
                    email: "findme@reducers-auth.com",
                    password: "hello123",
                    image_url: "https://bit.ly/2xoMRL7"
                }
            }
        case UNAUTHENTICATE:
            return {
                token: null, isAuthenticated: false, user: null
            }
        default :
            return state
    }
}