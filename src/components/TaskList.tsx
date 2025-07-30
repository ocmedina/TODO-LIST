import TaskItem from "./TaskItem";
import type { Task } from "../types/Task";

type Props = {
  tasks: Task[];
  toggleCompleted: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
};

function TaskList({ tasks, toggleCompleted, editTask, deleteTask }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No hay tareas por el momento.
      </p>
    );
  }

  return (
    <ul className="space-y-3 max-w-xl mx-auto p-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
