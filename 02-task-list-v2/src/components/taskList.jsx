import { useTask } from '../hooks/useTask'
import { TaskItem } from './task'

export const TaskList = () => {
  const { activeTasks, completeTask, currentTime } = useTask()

  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem completeTask={completeTask} task={task} key={task.id} isOverdue={new Date(task.deadline) < currentTime} />
      ))}
    </ul>
  )
}
