import {
  NAME_REGEX,
  BIRTHDAY_REGEX,
  PASSWORD_REGEX,
  EMAIL_REGEX,
} from './regex'

export const validationName = (
  value,
  isValidUserInfo,
  setIsValidUserInfo,
  setErrorsUserInfo,
  errorsUserInfo
) => {
  if (!NAME_REGEX.test(value)) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      name: 'Имя может быть введено только кириллицей. Допускаются пробелы и дефисы',
    })
    setIsValidUserInfo({ ...isValidUserInfo, name: false })
  } else if (value.length > 50 || value.length < 2) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      name: 'Имя должно быть длиной от 2 до 50 символов',
    })
    setIsValidUserInfo({ ...isValidUserInfo, name: false })
  } else {
    setIsValidUserInfo({ ...isValidUserInfo, name: true })
    setErrorsUserInfo({ ...errorsUserInfo, name: '' })
  }
}

export const validationSurname = (
  value,
  isValidUserInfo,
  setIsValidUserInfo,
  setErrorsUserInfo,
  errorsUserInfo
) => {
  if (!NAME_REGEX.test(value)) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      surname:
        'Фамилия может быть введена только кириллицей. Допускаются пробелы и дефисы',
    })
    setIsValidUserInfo({ ...isValidUserInfo, surname: false })
  } else if (value.length > 50 || value.length < 2) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      surname: 'Фамилия должна быть длиной от 1 до 50 символов',
    })
    setIsValidUserInfo({ ...isValidUserInfo, surname: false })
  } else {
    setIsValidUserInfo({ ...isValidUserInfo, surname: true })
    setErrorsUserInfo({ ...errorsUserInfo, surname: '' })
  }
}

export const validationBirthday = (
  value,
  isValidUserInfo,
  setIsValidUserInfo,
  setErrorsUserInfo,
  errorsUserInfo
) => {
  const currentYear = new Date().getFullYear()
  if (!BIRTHDAY_REGEX.test(value)) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      birthday: 'Дата рождения введена некорректно',
    })
    setIsValidUserInfo({ ...isValidUserInfo, birthday: false })
  } else if (value.slice(6, 10) > currentYear) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      birthday: 'Путешествуете во времени?',
    })
    setIsValidUserInfo({ ...isValidUserInfo, birthday: false })
  } else {
    setIsValidUserInfo({ ...isValidUserInfo, birthday: true })
    setErrorsUserInfo({ ...errorsUserInfo, birthday: '' })
  }
}

export const validationCity = (
  value,
  isValidUserInfo,
  setIsValidUserInfo,
  setErrorsUserInfo,
  errorsUserInfo
) => {
  if (!NAME_REGEX.test(value)) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      city: 'Название города может быть введено только кириллицей. Допускаются пробелы и дефисы',
    })
    setIsValidUserInfo({ ...isValidUserInfo, city: false })
  } else if (value.length > 50 || value.length < 2) {
    setErrorsUserInfo({
      ...errorsUserInfo,
      city: 'Название города должно быть длиной от 2 до 50 символов',
    })
    setIsValidUserInfo({ ...isValidUserInfo, city: false })
  } else {
    setIsValidUserInfo({ ...isValidUserInfo, city: true })
    setErrorsUserInfo({ ...errorsUserInfo, city: '' })
  }
}

export const validationPassword = (
  name,
  value,
  setErrorsUserInfo,
  errorsUserInfo,
  currentUser,
  setIsValidPasswords,
  isValidPasswords,
  currentPassword
) => {
  if (name === 'newPassword') {
    if (PASSWORD_REGEX.test(value)) {
      setIsValidPasswords({ ...isValidPasswords, newPassword: true })
      setErrorsUserInfo({
        ...errorsUserInfo,
        newPassword: '',
      })
    } else {
      setIsValidPasswords({ ...isValidPasswords, newPassword: false })
      setErrorsUserInfo({
        ...errorsUserInfo,
        newPassword:
          'Пароль должен включать в себя не менее 6 символов латинского алфавита верхнего и нижнего регистра и хотя бы одну цифру',
      })
    }
  }
  if (name === 'passwordConfirmation') {
    if (currentUser.newPassword !== value) {
      setIsValidPasswords({ ...isValidPasswords, passwordConfirmation: false })
      setErrorsUserInfo({
        ...errorsUserInfo,
        passwordConfirmation: 'Пароли не совпадают',
      })
    } else {
      setIsValidPasswords({ ...isValidPasswords, passwordConfirmation: true })
      setErrorsUserInfo({
        ...errorsUserInfo,
        passwordConfirmation: '',
      })
    }
  }

  if (name === 'previousPassword') {
    if (currentPassword !== value) {
      setIsValidPasswords({ ...isValidPasswords, previousPassword: false })
      setErrorsUserInfo({
        ...errorsUserInfo,
        previousPassword: 'Старый пароль указан неверно',
      })
    } else {
      setErrorsUserInfo({
        ...errorsUserInfo,
        previousPassword: '',
      })
      setIsValidPasswords({ ...isValidPasswords, previousPassword: true })
    }
  }
}

export const validationEmail = (
  value,
  setIsValidUserContacts,
  isValidUserContacts,
  setErrorsUserContacts,
  errorsUserContacts
) => {
  if (!EMAIL_REGEX.test(value)) {
    setErrorsUserContacts({
      ...errorsUserContacts,
      email: 'Введите email в формате address@domain.com',
    })
    setIsValidUserContacts({ ...isValidUserContacts, email: false })
  } else if (value.length < 5 || value.length > 50) {
    setErrorsUserContacts({
      ...errorsUserContacts,
      email: 'Email должен быть длиной от 5 до 50 символов',
    })
    setIsValidUserContacts({ ...isValidUserContacts, email: false })
  } else {
    setErrorsUserContacts({
      ...errorsUserContacts,
      email: '',
    })
    setIsValidUserContacts({ ...isValidUserContacts, email: true })
  }
}

export const validationPhone = (
  value,
  setIsValidUserContacts,
  isValidUserContacts,
  setErrorsUserContacts,
  errorsUserContacts
) => {
  if (value.length < 16) {
    setErrorsUserContacts({
      ...errorsUserContacts,
      phone: 'Номер телефона не может содержать менее 16 символов',
    })
    setIsValidUserContacts({ ...isValidUserContacts, phone: false })
  } else {
    setErrorsUserContacts({
      ...errorsUserContacts,
      phone: '',
    })
    setIsValidUserContacts({ ...isValidUserContacts, phone: true })
  }
}

export function deleteNonLatin(text) {
  return text.replace(/[^A-Za-z0-9:_//.]/gi, '')
}
