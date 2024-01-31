class Api {
  constructor({ headers, baseUrl }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  // eslint-disable-next-line class-methods-use-this
  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(new Error(`${res.status} ${res.statusText}`))
  }

  getUserInfo(id) {
    const requestUrl = `${this._baseUrl}/my-profile/${id}/`
    return fetch(requestUrl, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getInitialResumes() {
    const requestUrl = `${this._baseUrl}/resumes`
    return fetch(requestUrl, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  getServerData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  setUserInfo(body) {
    const requestUrl = `${this._baseUrl}/users/me`
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse)
  }

  addNewCard(body) {
    const requestUrl = `${this._baseUrl}/cards`
    return fetch(requestUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse)
  }

  deleteCard(cardId) {
    const requestUrl = `${this._baseUrl}/cards/${cardId}`
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  addCardLike(cardId) {
    const requestUrl = `${this._baseUrl}/cards/likes/${cardId}`
    return fetch(requestUrl, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  deleteCardLike(cardId) {
    const requestUrl = `${this._baseUrl}/cards/likes/${cardId}`
    return fetch(requestUrl, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  setProfileAvatar(body) {
    const requestUrl = `${this._baseUrl}/users/me/avatar`
    return fetch(requestUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(body),
    }).then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://mcsimoff.pythonanywhere.com',
  headers: {
    // authorization: 'a772ee3c-7f9f-4379-9fba-e4883f8faf6c',
    'Content-Type': 'application/json',
  },
})

export default api
