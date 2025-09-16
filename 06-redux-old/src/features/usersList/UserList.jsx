export const UserList = () => {
  return (
    <div className="user-list">
      <h2>User List</h2>

      {/* Кнопка загрузки */}
      <button className="load-btn">Load Users</button>

      <ul>
        <li>
          <span>Name - email</span>

          <div className="btn-group">
            <button className="select-btn">Select</button>

            <button className="delete-btn">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  )
}
