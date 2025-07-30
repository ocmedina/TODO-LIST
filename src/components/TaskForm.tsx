import { useState } from 'react';

type Props = {
  addTask: (title: string, category: string) => void;
};

const TaskForm = ({ addTask }: Props) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title, category);
    setTitle('');
    setCategory('General');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center justify-center">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
        className="p-2 rounded border w-full sm:w-1/2 dark:bg-slate-800"
      />
      <div className="flex flex-col">
        <label htmlFor="category" className="sr-only">Categoría</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 rounded border dark:bg-slate-800"
        >
          <option>General</option>
          <option>Trabajo</option>
          <option>Estudio</option>
          <option>Personal</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Agregar
      </button>
    </form>
  );
};

export default TaskForm;
