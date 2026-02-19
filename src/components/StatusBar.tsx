import { useEditor } from '../context/EditorContext';
import { countWords, countCharacters } from '../utils/markdown';

/**
 * 状态栏组件
 */
export function StatusBar() {
  const { markdown, cursor } = useEditor();

  const wordCount = countWords(markdown);
  const charCount = countCharacters(markdown);

  return (
    <div className="h-[30px] flex items-center justify-between px-4 text-xs border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
      <div className="flex items-center gap-4 text-gray-600 dark:text-slate-400">
        <span>{wordCount} 字</span>
        <span>{charCount} 字符</span>
      </div>
      <div className="text-gray-600 dark:text-slate-400">
        行 {cursor.line} : 列 {cursor.column}
      </div>
    </div>
  );
}
