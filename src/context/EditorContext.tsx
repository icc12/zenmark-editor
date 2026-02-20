import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { EditorContextType, CursorPosition, ViewMode, ThemeMode } from '../types/editor';

// 默认初始状态
const defaultState: EditorContextType = {
  markdown: '# ZenMark Editor\n\n欢迎使用 ZenMark Editor！\n\n## 功能特性\n\n- 实时预览\n- 语法高亮\n- 同步滚动\n- 主题切换\n\n开始你的写作之旅吧！\n\n```javascript\nconsole.log("Hello, ZenMark!");\n```',
  title: '无标题文档',
  theme: 'dark',
  viewMode: 'split',
  splitPosition: 50,
  cursor: { line: 1, column: 1 },
  setMarkdown: () => {},
  setTitle: () => {},
  toggleTheme: () => {},
  setViewMode: () => {},
  setSplitPosition: () => {},
  setCursor: () => {},
  insertFormat: () => {},
  insertImage: () => {},
  insertLink: () => {},
  openFile: () => {},
  saveFile: () => {},
  exportHTML: () => {},
  exportPDF: () => {},
  copyHTML: () => {},
  clearAll: () => {},
};

// 创建 Context
const EditorContext = createContext<EditorContextType>(defaultState);

// LocalStorage 键名
const STORAGE_KEYS = {
  MARKDOWN: 'zenmark-editor-content',
  TITLE: 'zenmark-editor-title',
  THEME: 'zenmark-editor-theme',
  SPLIT_POSITION: 'zenmark-editor-split-position',
} as const;

// Provider 组件
interface EditorProviderProps {
  children: ReactNode;
}

export function EditorProvider({ children }: EditorProviderProps) {
  // 从 localStorage 加载初始状态
  const [markdown, setMarkdownState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MARKDOWN) || defaultState.markdown;
    } catch {
      return defaultState.markdown;
    }
  });

  const [title, setTitleState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.TITLE) || defaultState.title;
    } catch {
      return defaultState.title;
    }
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as ThemeMode;
      return savedTheme || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [splitPosition, setSplitPositionState] = useState(() => {
    try {
      return parseInt(localStorage.getItem(STORAGE_KEYS.SPLIT_POSITION) || '50', 10);
    } catch {
      return 50;
    }
  });

  const [viewMode, setViewModeState] = useState<ViewMode>('split');
  const [cursor, setCursorState] = useState<CursorPosition>({ line: 1, column: 1 });

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKDOWN, markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TITLE, title);
  }, [title]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SPLIT_POSITION, splitPosition.toString());
  }, [splitPosition]);

  // 同步主题到 document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // 动作函数
  const setMarkdown = useCallback((text: string) => {
    setMarkdownState(text);
  }, []);

  const setTitle = useCallback((newTitle: string) => {
    setTitleState(newTitle);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
  }, []);

  const setSplitPosition = useCallback((position: number) => {
    const clampedPosition = Math.max(30, Math.min(70, position));
    setSplitPositionState(clampedPosition);
  }, []);

  const setCursor = useCallback((position: CursorPosition) => {
    setCursorState(position);
  }, []);

  // 插入格式
  const insertFormat = useCallback((format: string) => {
    setMarkdownState(prev => {
      // 这里需要从编辑器组件获取当前光标位置和选中文本
      // 暂时简单实现，实际需要与编辑器组件配合
      return prev; // 将在 Editor 组件中实现
    });
  }, []);

  // 插入图片
  const insertImage = useCallback((url: string) => {
    setMarkdownState(prev => `${prev}\n
![图片](${url})`);
  }, []);

  // 插入链接
  const insertLink = useCallback((url: string, text?: string) => {
    const linkText = text || '链接文字';
    setMarkdownState(prev => `${prev}[${linkText}](${url})`);
  }, []);

  // 打开文件
  const openFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setMarkdownState(content);
      setTitleState(file.name.replace('.md', '').replace('.txt', ''));
    };
    reader.readAsText(file);
  }, []);

  // 保存文件
  const saveFile = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown, title]);

  // 导出 HTML
  const exportHTML = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [markdown, title]);

  // 导出 PDF
  const exportPDF = useCallback(() => {
    window.print();
  }, []);

  // 复制 HTML
  const copyHTML = useCallback(() => {
    navigator.clipboard.writeText(markdown).then(() => {
      // 可以显示复制成功提示
    }).catch(() => {
      // 可以显示复制失败提示
    });
  }, [markdown]);

  // 清空内容
  const clearAll = useCallback(() => {
    setMarkdownState('');
  }, []);

  const value: EditorContextType = {
    markdown,
    title,
    theme,
    viewMode,
    splitPosition,
    cursor,
    setMarkdown,
    setTitle,
    toggleTheme,
    setViewMode,
    setSplitPosition,
    setCursor,
    insertFormat,
    insertImage,
    insertLink,
    openFile,
    saveFile,
    exportHTML,
    exportPDF,
    copyHTML,
    clearAll,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}

// 自定义 Hook 使用 Context
export function useEditor(): EditorContextType {
  const context = useContext(EditorContext);
  return context;
}
