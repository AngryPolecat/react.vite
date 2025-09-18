import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from './userListReducer'

export const UserList = () => {
  const users = useSelector((state) => state.userListReducer.users)
  const loading = useSelector((state) => state.userListReducer.loading)
  const error = useSelector((state) => state.userListReducer.error)
  const dispatch = useDispatch()

  const handlerSelectUser = (id) => {
    const currentUser = users.find((user) => user.id === id)
    currentUser && dispatch({ type: 'userDetails/selectedUser', payload: currentUser })
  }

  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* Кнопка загрузки */}
      <button className="load-btn" onClick={() => dispatch(loadUsers())}>
        Load Users
      </button>

      {loading && <p>Loading users...</p>}
      {error && <p>Error load users...</p>}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} - {user.email}
            </span>
            <div className="btn-group">
              <button className="select-btn" onClick={() => handlerSelectUser(user.id)}>
                Select
              </button>
              <button className="delete-btn" onClick={() => dispatch({ type: 'userList/deleteUser', payload: user.id })}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
