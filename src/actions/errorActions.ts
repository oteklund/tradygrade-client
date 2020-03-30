import { GET_ERRORS, CLEAR_ERRORS } from "../models/constants";
import { Error } from "../models/types"

// Return errors
export const returnErrors = (error: Error) => {
    return {
        type: GET_ERRORS,
        payload: error
    }
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}