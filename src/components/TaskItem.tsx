import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Importa el icono
import type { Task } from '../types/Task';

type Props = {
  task: Task;
  toggleCompleted: (id: string) => void;
  editTask: (id: string, newTitle: string) => void;
  deleteTask: (id: string) => void;
};

function TaskItem({ task, toggleCompleted, editTask, deleteTask }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = tempTitle.trim();
    if (trimmed) {
      editTask(task.id, trimmed);
    } else {
      setTempTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTempTitle(task.title);
      setIsEditing(false);
    }
  };

  return (
    <li className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-2 flex items-center justify-between">
      <label className="flex items-center gap-3 cursor-pointer flex-1">
        <motion.input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleCompleted(task.id)}
          className="w-5 h-5 accent-blue-600"
          whileTap={{ scale: 1.2 }}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-b border-blue-600 focus:outline-none text-gray-800 dark:text-gray-200"
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span
            className={`${task.completed ? 'line-through opacity-50' : ''} flex-1`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </span>
        )}
      </label>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700 p-1 rounded transition"
        aria-label="Eliminar tarea"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </li>
  );
}

export default TaskItem;
