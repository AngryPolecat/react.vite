export const MIN_LENGTH_LOGIN = 5
export const MIN_LENGTH_PASS = 8
export const URL_AUTH = 'http://srv01.kemoms.ru/php/auth.php'
export const METHOD = (data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }
}
