import { useTask } from '../hooks/useTask'

export const TaskItem = ({ task, completeTask, isOverdue }) => {
  const { deleteTask } = useTask()
  const { title, priority, deadline, id, completed } = task

  return (
    <li className={`task-item ${priority.toLowerCase()} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">Due: {new Date(deadline).toLocaleString()}</div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  )
}
