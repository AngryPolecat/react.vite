const MESSAGE_OPENING_LIMIT = 5000
const LIMIT_MODELS_ON_PAGE = 12
const LIMIT_LPU_ON_PAGE = 20
const URL_AUTH = 'http://srv01.kemoms.ru/php/auth.php'
const URL_CHECK_SESSION = 'http://srv01.kemoms.ru/php/checkSession.php'
const URL_GET_LIST_MODELS = 'http://srv01.kemoms.ru/php/getListModels.php'
const URL_ADD_MODEL = 'http://srv01.kemoms.ru/php/createModel.php'
const URL_LOAD_LISTS = 'http://srv01.kemoms.ru/php/getLists.php'
const URL_GET_LIST_LPU = 'http://srv01.kemoms.ru/php/getListLpu.php'
const URL_GET_LIST_DEP = 'http://srv01.kemoms.ru/php/getListDepartment.php'
const URL_GET_DATA_MODEL = 'http://srv01.kemoms.ru/php/getDatasetModel.php'
const URL_GET_VARIANT = 'http://srv01.kemoms.ru/php/getVariant.php'

const ST = '7ae3e7a6-b1a2-4e69-95ab-50c25459c64e'
const AMB = 'afe58793-5e76-4cd6-afff-8d70fd312bb4'
const DSP = '831d818f-c2c3-46ae-a500-61d872b12d1a'
const SZT = '2b11f2c3-69f3-463f-bc0e-6b68c9a49051'
const ODLI = '4ff87425-4e6d-434b-822a-5010b9f1ac1c'
const SMP = '22c164fa-2c34-4b28-9ccb-93011a94095f'
const INO = 'e9894eb8-402f-4ce4-a8b2-ae43fccfd2c6'

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
  URL_GET_LIST_DEP,
  URL_GET_DATA_MODEL,
  URL_GET_VARIANT,
}

export const TYPEPOM = {
  ST,
  AMB,
  DSP,
  SZT,
  ODLI,
  SMP,
  INO,
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
