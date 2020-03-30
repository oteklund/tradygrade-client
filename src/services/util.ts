export function tokenAndHeaderConfig(): Record<string, string> {
    // get token from localstorage
    const token = localStorage.getItem("token")

    //set request headers
    let headers: Record<string, string> = { "Content-Type": "application/json" }
    if (token) {
        headers = { ...headers, "Authorization": `Bearer ${token}` }
    }
    return headers
}

// handles fetch errors
export function handleErrors(response: any) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}