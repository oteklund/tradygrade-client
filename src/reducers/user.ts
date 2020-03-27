import { IAuthenticate, IUnauthenticate } from "../actions/userActions"
import { AUTHENTICATE, UNAUTHENTICATE } from "../models/constants"
import { User } from "../models/types"

export function userReducer(
    state: User = {
        name: "",
        email: null,
        password: null,
        token: null,
        refreshToken: null,
        image_url: null,
        isAuthenticated: null
    },
    action: IAuthenticate | IUnauthenticate,
): User {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                name: action.payload.name,
                email: action.payload.email,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                password: action.payload.password,
                image_url: action.payload.image_url,
                isAuthenticated: true
            }
        case UNAUTHENTICATE:
            return {
                name: "",
                email: null,
                password: null,
                token: null,
                refreshToken: null,
                isAuthenticated: false
            }
        default:
            return state
    }
}