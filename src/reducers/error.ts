import { GET_ERRORS, CLEAR_ERRORS } from "../models/constants";
import { Error } from "../models/types"


export function errorReducer(initialState: Error = {
    message: {},
    status: null,
    id: null
}, action: any): any {
    switch(action.type) {
        case GET_ERRORS:
            return {
                message: action.payload.message,
                status: action.payload.status,
                id: action.payload.id
            }
        case CLEAR_ERRORS:
            return {
                message: {},
                status: null,
                id: null
            }
        default:
            return initialState
    }
}