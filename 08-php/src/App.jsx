import { useEffect, useState } from 'react'
import './App.css'

const DATA = { name: 'John', surname: 'Smith' }
const URL = 'http://srv01.kemoms.ru/php/test.php'
const METHOD = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(DATA),
}

const loaderData = async () => {
  const res = await fetch(URL, METHOD)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return await res.json()
}

export const App = () => {
  const [state, setState] = useState({})

  useEffect(() => {
    fetch(URL, METHOD)
      .then((result) => result.json())
      .then((data) => setState(data))
      .catch((error) => console.log(error.message))
  }, [])

  return (
    <div>
      <div>Spam: {state.spam}</div>
      <div>Error: {state.error}</div>
      <div>Message: {state.msg}</div>
    </div>
  )
}
