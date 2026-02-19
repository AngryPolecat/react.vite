const MESSAGE_OPENING_LIMIT = 4000
const LIMIT_MODELS_ON_PAGE = 12
const LIMIT_LPU_ON_PAGE = 20
const URL_AUTH = 'http://srv01.kemoms.ru/php/auth.php'
const URL_CHECK_SESSION = 'http://srv01.kemoms.ru/php/checkSession.php'
const URL_GET_LIST_MODELS = 'http://srv01.kemoms.ru/php/getListModels.php'
const URL_ADD_MODEL = 'http://srv01.kemoms.ru/php/createModel.php'
const URL_LOAD_LISTS = 'http://srv01.kemoms.ru/php/getLists.php'
const URL_GET_LIST_LPU = 'http://srv01.kemoms.ru/php/getListLpu.php'

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
  LIMIT_MODELS_ON_PAGE,
  LIMIT_LPU_ON_PAGE,
}

export const URL = {
  URL_AUTH,
  URL_CHECK_SESSION,
  URL_GET_LIST_MODELS,
  URL_ADD_MODEL,
  URL_LOAD_LISTS,
  URL_GET_LIST_LPU,
}

export const SUCCESS_MESSAGE = (message) => {
  return {
    type: 'success',
    text: message,
  }
}

export const WARNING_MESSAGE = (message) => {
  return {
    type: 'error',
    text: message,
  }
}
