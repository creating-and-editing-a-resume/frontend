const BASE_URL = 'http://dev.acceleratorpracticum.ru/'

// Запрос на получение объекта с общими данными пользователя
export function getProfileData() {
  return fetch(`${BASE_URL}/my-profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.status
    })
    .then(data => data)
}

// Запрос на редактирование данных пользователя
export function editProfile(
  name,
  surname,
  birthday,
  city,
  previousPassword,
  newPassword,
  confirmPassword,
  email,
  telegram,
  phone
) {
  return fetch(`${BASE_URL}/my-profile`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      name,
      surname,
      birthday,
      city,
      previousPassword,
      newPassword,
      confirmPassword,
      email,
      telegram,
      phone,
    }),
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.status
    })
    .then(data => data)
}

// Запрос на получение массива с объектами данных
export function getPersonalData() {
  return fetch(`${BASE_URL}/personal-data`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.status
    })
    .then(data => data)
}

// Запрос к серверу на создание объекта данных
export function createPersonalData(data) {
  return fetch(`${BASE_URL}/personal-data`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ data }),
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.status
    })
    .then(res => res)
}

// Запрос на изменение объекта данных
export function editPersonalData(data) {
  return fetch(`${BASE_URL}/personal-data`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ data }),
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return res.status
    })
    .then(res => res)
}

// Запрос на удаление объекта из общего массива резюме
export function deletePersonalData(id) {
  return fetch(`${BASE_URL}/personal-data/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    return res.status
  })
}
