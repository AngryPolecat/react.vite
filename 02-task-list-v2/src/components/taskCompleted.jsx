import { useTask } from '../hooks/useTask'
import { TaskItem } from './task'

export const CompletedTaskList = () => {
  const { completedTasks } = useTask()

  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}
