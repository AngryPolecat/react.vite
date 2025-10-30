import { METHOD } from '../const/const'

export const loaderData = async (url, data) => {
  const res = await fetch(url, METHOD(data))
  if (!res.ok) {
    throw new Error('Ошибка: невозможно получить данные')
  }
  return await res.json()
}
