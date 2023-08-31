class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    _getResponseInfo(response) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(`Произошла ошибка: ${response.status}`)
    }

    getProfileAndCards() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    patchUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._getResponseInfo)
    }

    addNewCard(formItems) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formItems.name,
                link: formItems.description
            })
        })
            .then(this._getResponseInfo)
    }

    deleteCard(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    putCardLike(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    deleteCardLike(itemId) {
        return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseInfo)
    }

    patchProfileImage(profileImage) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: profileImage.avatar
            })
        })
            .then(this._getResponseInfo)
    }
}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '2305e905-bab3-4d55-ab85-4f77082b3877',
        'Content-Type': 'application/json'
    }
})