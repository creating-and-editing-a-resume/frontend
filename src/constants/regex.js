// PersonalData page:

// const NAME_REGEX = /^[a-z0-9_-]{2,16}$/
const NAME_REGEX = /^(?!.*(.)\1{2,})[а-яА-ЯЁё\-\s]*$/
// const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-].[a-zA-Z0-9-.]+$/
// const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/

const BIRTHDAY_REGEX = /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[012]).((19|20)\d\d)/

// Experience page:
const COMPANY_NAME_REGEX = /^[а-яА-ЯЁё0-9a-zA-Z\-'"`«»\s]*$/

const JOB_NAME_REGEX = /^[а-яА-ЯЁё0-9a-zA-Z\-\s]*$/
const YEAR_REGEX = /^[0-9]{4}$/

const DUTIES_REGEX = /^[а-яА-ЯЁё0-9\-\s]*$/

const SITE_REGEX = /https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i

export {
  NAME_REGEX,
  EMAIL_REGEX,
  BIRTHDAY_REGEX,
  COMPANY_NAME_REGEX,
  JOB_NAME_REGEX,
  YEAR_REGEX,
  DUTIES_REGEX,
  SITE_REGEX,
}
