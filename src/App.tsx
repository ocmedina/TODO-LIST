import { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  ClipboardIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggle from './components/ThemeToggle';
import type { Task } from './types/Task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, category: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      category,
      createdAt: new Date().toISOString(), // <-- esta línea soluciona el error
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, title: newTitle } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const deleteCompletedTasks = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const toggleAllCompleted = (completed: boolean) => {
    setTasks(prev => prev.map(task => ({ ...task, completed })));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    const matchesCategory =
      categoryFilter === null || task.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const total = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = total - completedCount;

  const uniqueCategories = [...new Set(tasks.map(t => t.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-gray-200">
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="w-72 bg-white dark:bg-slate-800 border-r border-gray-300 dark:border-slate-700 p-4 flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">🧾 To-Do List</h2>
        <nav className="flex flex-col gap-3">
          {[
            { label: 'Todas', value: 'all', icon: ClipboardIcon },
            { label: 'Completadas', value: 'completed', icon: CheckCircleIcon },
            { label: 'Pendientes', value: 'pending', icon: ClockIcon },
          ].map(({ label, value, icon: Icon }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                filter === value
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setFilter(value as typeof filter)}
            >
              <Icon className="w-5 h-5" />
              {label}
            </motion.button>
          ))}
        </nav>

        {/* Filtro de categorías */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-2">Categorías</h3>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setCategoryFilter(null)}
              className={`text-left px-3 py-1 rounded ${
                categoryFilter === null
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-blue-100 dark:hover:bg-slate-700'
              }`}
            >
              Todas
            </button>
            {uniqueCategories.map(category => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`text-left px-3 py-1 rounded ${
                  categoryFilter === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-100 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Acciones globales */}
        <button
          onClick={deleteCompletedTasks}
          className="mt-6 w-full bg-red-600 text-white rounded px-3 py-2 hover:bg-red-700 transition"
        >
          Eliminar completadas
        </button>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => toggleAllCompleted(true)}
            className="flex-1 bg-green-600 text-white rounded px-3 py-2 hover:bg-green-700 transition"
          >
            Marcar todas
          </button>
          <button
            onClick={() => toggleAllCompleted(false)}
            className="flex-1 bg-yellow-600 text-white rounded px-3 py-2 hover:bg-yellow-700 transition"
          >
            Desmarcar todas
          </button>
        </div>

        {/* Estadísticas */}
        <div className="mt-6 px-3 py-2 bg-gray-200 dark:bg-slate-700 rounded text-center text-gray-700 dark:text-gray-300">
          <p>Total: {total}</p>
          <p>Completadas: {completedCount}</p>
          <p>Pendientes: {pendingCount}</p>
        </div>

         <div className="flex justify-center p-5">
          <img
            src="/logo_om.png" // ⚠️ Cambiá esto por la ruta correcta de tu logo
            alt="Logo"
            className="h-10 w-auto"
          />
        </div>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </motion.aside>

      

    <main className="flex-1 p-7 overflow-auto flex flex-col items-center">
  <div className="w-full max-w-2xl p-5">
    <TaskForm addTask={addTask} />
    <TaskList
      tasks={filteredTasks}
      toggleCompleted={toggleCompleted}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  </div>
</main>

    </div>
  );
}

export default App;
