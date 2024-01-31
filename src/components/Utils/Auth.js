export const BASE_URL = 'https://mcsimoff.pythonanywhere.com'

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(new Error(`${res.status} ${res.statusText}`))
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => checkResponse(res))
    .then(data => data)
}

export const register = (email, password) =>
  fetch(`${BASE_URL}/signup/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(res => checkResponse(res))

export const authorize = (email, password) =>
  fetch(`${BASE_URL}/signin/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(res => checkResponse(res))
    .then(data => {
      console.log(data)
      if (data.auth_token) {
        localStorage.setItem('token', data.auth_token)
        return data
      }
      return data
    })

export const checkToken = token =>
  fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => checkResponse(res))
