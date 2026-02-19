import { useRef, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { useEditor as useEditorContext } from '../context/EditorContext';

/**
 * 编辑器组件
 */
export function Editor() {
  const { markdown, setMarkdown, setCursor, theme } = useEditorContext();
  const editorRef = useRef<HTMLDivElement>(null);

  // 自定义主题扩展
  const customTheme = EditorView.theme({
    '&': {
      fontSize: '14px',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    },
    '.cm-gutters': {
      backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
      color: theme === 'dark' ? '#64748b' : '#9ca3af',
      borderRight: theme === 'dark' ? '1px solid #1e293b' : '1px solid #e5e7eb',
    },
    '.cm-content': {
      padding: '24px',
      minHeight: '100%',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
    },
    '.cm-line': {
      padding: '0',
      minHeight: '1.5em',
    },
    '.cm-scroller': {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      overflow: 'auto',
    },
    '.cm-activeLine': {
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f3f4f6',
    },
    '.cm-activeLineGutter': {
      backgroundColor: theme === 'dark' ? '#1e293b' : '#f3f4f6',
      color: theme === 'dark' ? '#94a3b8' : '#6b7280',
    },
    '.cm-focused': {
      outline: 'none',
    },
  });

  // 监听光标位置变化
  const handleChange = useCallback((value: string) => {
    setMarkdown(value);
  }, [setMarkdown]);

  const handleEditorChange = useCallback((value: string, viewUpdate: any) => {
    setMarkdown(value);

    // 更新光标位置
    const state = viewUpdate.state;
    const cursor = state.selection.main.head;
    const line = state.doc.lineAt(cursor);
    const column = cursor - line.from + 1;
    setCursor({ line: line.number, column });
  }, [setMarkdown, setCursor]);

  // 暴露滚动方法给父组件
  useEffect(() => {
    if (editorRef.current) {
      const editorElement = editorRef.current.querySelector('.cm-scroller');
      if (editorElement) {
        (editorElement as any).editorElement = editorElement;
      }
    }
  }, []);

  return (
    <div ref={editorRef} className="h-full overflow-hidden">
      <CodeMirror
        value={markdown}
        height="100%"
        theme={customTheme}
        extensions={[
          markdown(),
          EditorView.lineWrapping,
        ]}
        onChange={handleEditorChange}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightSpecialChars: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="h-full"
      />
    </div>
  );
}
