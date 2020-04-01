import jwt_decode from 'jwt-decode'

export async function tokenAndHeaderConfig() {
    // get token from localstorage    
    let token = localStorage.getItem("token")
    const refreshToken = localStorage.getItem("refreshToken")
    //set request headers
    let headers: Object = { "Content-Type": "application/json" }
    if (token) {
        //check if access token has expired
        let expired = checkIfTokenIsExpired(token)
        if (expired && refreshToken) {
            //check if refresh token has expired
            const refreshTokenExpired = checkIfRefreshTokenIsExpired(refreshToken)
            //valid refresh token exists, retrieve new access token
            if (!refreshTokenExpired) {
                await utilizeRefreshToken(refreshToken)
                token = localStorage.getItem("token")
                expired = false
            }
        }
        //preexisting token is valid or a new token has been applied, add to headers 
        if (token && !expired) headers = { ...headers, "Authorization": `Bearer ${token}` }
    }
    return headers
}

export async function utilizeRefreshToken(refreshToken: string) {
    await fetch("http://localhost:4000/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshToken })
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.user.token)
        })
        .catch(error => console.error(error))
}

export const checkIfTokenIsExpired = (token: string) => {
    const { exp } = jwt_decode(token)
    if (Date.now() >= exp * 1000) {
        console.log("token has expired, attempting to refresh...");
        return true;
    }
    // token is not expired:
    else return false
}

export const checkIfRefreshTokenIsExpired = (refreshToken: string) => {
    const { exp } = jwt_decode(refreshToken)
    if (Date.now() >= exp * 1000) {
        console.log("refresh token has expired, please log in again to renew authorization");
        return true;
    }
    // token is not expired:
    else return false
}

// handles fetch errors
export function handleErrors(response: any) {
    if (!response.ok) {
        throw Error("Error in fetch request: " + response.statusText);
    }
    return response;
}