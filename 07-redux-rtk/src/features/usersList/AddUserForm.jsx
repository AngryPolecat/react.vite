import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './userListSlice'

export const AddUserForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  const handlerAddUser = (e) => {
    e.preventDefault()
    dispatch(addUser({ id: Date.now(), name, email }))
    setName('')
    setEmail('')
  }

  return (
    <form className="add-user-form">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit" onClick={handlerAddUser}>
        Add User
      </button>
    </form>
  )
}
