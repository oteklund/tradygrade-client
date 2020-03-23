import { IAuthenticate, IUnauthenticate } from "../actions/index"
import { AUTHENTICATE, UNAUTHENTICATE } from "../models/constants"
import { Authorization } from "../models/types"

export default function authReducer(
    state: Authorization = {
        token: null,
        isAuthenticated: null,
    },
    action: IAuthenticate | IUnauthenticate,
): Authorization {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state, token: "placeholder-token", isAuthenticated: true
            }
        case UNAUTHENTICATE:
            return {
                token: null, isAuthenticated: false
            }
    }
    return state
}