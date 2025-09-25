import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from './userDetailSlice'

export const SelectedUserDetails = () => {
  const user = useSelector((state) => state.userDetails.user)

  const dispatch = useDispatch()

  return (
    <div className="selected-user-details">
      <h2>Selected User</h2>
      <p>
        <strong>Name: </strong>
        {user.name}
      </p>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>

      <button className="clear-btn" onClick={() => dispatch(clearUser())}>
        Clear Selection
      </button>
    </div>
  )
}
