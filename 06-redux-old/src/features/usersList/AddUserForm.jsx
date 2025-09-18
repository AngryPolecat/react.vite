import { useState } from 'react'
import { useDispatch } from 'react-redux'

export const AddUserForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()

  const handlerSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'userList/addUser', payload: { id: Date.now(), name, email } })
    setName('')
    setEmail('')
  }

  return (
    <form className="add-user-form">
      <input type="text" placeholder="Name" value={name} onChange={({ target }) => setName(target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={({ target }) => setEmail(target.value)} />
      <button type="submit" onClick={handlerSubmit}>
        Add User
      </button>
    </form>
  )
}
