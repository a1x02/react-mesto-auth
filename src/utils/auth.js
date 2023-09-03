export const baseUrl = 'https://auth.nomoreparties.co'

function _checkResponseStatus(response) {
    if (response.ok) {
        return response.json()
    }
    return Promise.reject(response.status)
}

export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
        // .then(() => console.log({password, email}))
        .then(res => _checkResponseStatus(res))

}

export const authorize = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
        .then(res => _checkResponseStatus(res))
}

export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => _checkResponseStatus(res))
}