import './App.css'
import { AddUserForm } from './features/usersList/AddUserForm'
import { UserList } from './features/usersList/UserList'
import { SelectedUserDetails } from './features/userDetails/SelectedUserDetails'

export const App = () => {
  return (
    <div className="app-container">
      <h1>User Management App</h1>
      <AddUserForm />
      <SelectedUserDetails />
      <UserList />
    </div>
  )
}
