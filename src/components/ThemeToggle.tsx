import { useEditor } from '../context/EditorContext';
import { Sun, Moon } from 'lucide-react';

/**
 * 主题切换按钮组件
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useEditor();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}
      aria-label="切换主题"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700" />
      ) : (
        <Sun className="w-5 h-5 text-slate-200" />
      )}
    </button>
  );
}
