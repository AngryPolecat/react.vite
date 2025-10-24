const MESSAGE_OPENING_LIMIT = 4000
const URL_AUTH = 'http://srv01.kemoms.ru/php/auth.php'
const URL_CHECK_SESSION = 'http://srv01.kemoms.ru/php/checkSession.php'
const URL_GET_LIST_MODELS = 'http://srv01.kemoms.ru/php/getListModels.php'
const URL_ADD_MODEL = 'http://srv01.kemoms.ru/php/createModel.php'

export const MIN_LENGTH_LOGIN = 5
export const MIN_LENGTH_PASS = 8
export const METHOD = (data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }
}

export const SETTINGS = {
  MESSAGE_OPENING_LIMIT,
}

export const URL = {
  URL_AUTH,
  URL_CHECK_SESSION,
  URL_GET_LIST_MODELS,
  URL_ADD_MODEL,
}
