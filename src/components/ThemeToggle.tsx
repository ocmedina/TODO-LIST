import { useEffect, useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-4 right-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white px-3 py-1 rounded-xl shadow-md hover:scale-105 transition"
    >
      {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
    </button>
  );
}

export default ThemeToggle;
