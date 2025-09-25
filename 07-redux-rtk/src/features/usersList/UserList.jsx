import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers } from './userListSlice'
import { getUser } from '../userDetails/userDetailSlice'

export const UserList = () => {
  const users = useSelector((state) => state.userList.users)
  const loading = useSelector((state) => state.userList.loading)
  const error = useSelector((state) => state.userList.error)

  const dispatch = useDispatch()

  const handlerSelectUser = (id) => {
    const currentUser = users.find((user) => user.id === id)
    currentUser && dispatch(getUser(currentUser))
  }

  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* Кнопка загрузки */}
      <button className="load-btn" onClick={() => dispatch(fetchUsers())}>
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
              <button className="delete-btn" onClick={() => dispatch(deleteUser(user.id))}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
