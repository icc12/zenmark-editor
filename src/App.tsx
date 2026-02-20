import { useRef, useState, useEffect } from 'react';
import { EditorProvider, useEditor } from './context/EditorContext';
import { Toolbar } from './components/Toolbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { StatusBar } from './components/StatusBar';
import { ResizableSplit } from './components/ResizableSplit';
import { useDebounce } from './hooks/useDebounce';
import { useScrollSync } from './hooks/useScrollSync';
import { Upload, Eye, Edit3, X } from 'lucide-react';

/**
 * 主应用内容组件
 */
function AppContent() {
  const {
    markdown,
    setMarkdown,
    theme,
    viewMode,
    splitPosition,
    setSplitPosition,
    setViewMode,
    openFile,
  } = useEditor();

  const editorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 防抖 Markdown 内容
  const debouncedMarkdown = useDebounce(markdown, 150);

  // 滚动同步
  const { handleEditorScroll, handlePreviewScroll } = useScrollSync(
    editorRef as any,
    previewRef,
    false
  );

  // 检测移动端
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 拖放文件处理
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const mdFile = files.find(f => f.name.endsWith('.md') || f.name.endsWith('.txt'));

    if (mdFile) {
      openFile(mdFile);
    } else {
      alert('请拖入 .md 或 .txt 文件');
    }
  };

  // 获取编辑器容器
  const getEditorContainer = () => {
    return editorRef.current?.querySelector('.cm-scroller') as HTMLElement;
  };

  // 获取预览容器
  const getPreviewContainer = () => {
    return previewRef.current as HTMLElement;
  };

  // 绑定滚动事件
  useEffect(() => {
    const editorContainer = getEditorContainer();
    const previewContainer = getPreviewContainer();

    if (editorContainer && previewContainer && !isMobile) {
      editorContainer.addEventListener('scroll', handleEditorScroll);
      previewContainer.addEventListener('scroll', handlePreviewScroll);

      return () => {
        editorContainer.removeEventListener('scroll', handleEditorScroll);
        previewContainer.removeEventListener('scroll', handlePreviewScroll);
      };
    }
  }, [handleEditorScroll, handlePreviewScroll, isMobile]);

  return (
    <div
      className={`
        h-screen overflow-hidden transition-colors duration-300
        ${theme === 'dark' ? 'bg-slate-950' : 'bg-white'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* 拖放提示层 */}
      {isDragging && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
          <div className="bg-blue-500 text-white px-8 py-4 rounded-2xl flex items-center gap-3">
            <Upload className="w-6 h-6" />
            <span className="text-lg font-medium">拖放文件到此处</span>
          </div>
        </div>
      )}

      {/* 顶部工具栏 */}
      <Toolbar />

      {/* 主内容区 */}
      <main
        className="h-[calc(100vh-50px-30px)] mt-[50px]"
      >
        {isMobile ? (
          // 移动端标签页模式
          <div className="h-full flex flex-col">
            {/* 标签页切换 */}
            <div className="flex border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
              <button
                onClick={() => setViewMode('editor')}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors
                  ${viewMode === 'editor'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-slate-400'
                  }
                `}
              >
                <Edit3 className="w-4 h-4" />
                编辑
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors
                  ${viewMode === 'preview'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                    : 'text-gray-600 dark:text-slate-400'
                  }
                `}
              >
                <Eye className="w-4 h-4" />
                预览
              </button>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 overflow-hidden">
              {viewMode === 'editor' ? (
                <div className="h-full">
                  <Editor />
                </div>
              ) : (
                <div ref={previewRef} className="h-full">
                  <Preview markdown={debouncedMarkdown} />
                </div>
              )}
            </div>
          </div>
        ) : (
          // 桌面端分屏模式
          <ResizableSplit
            splitPosition={splitPosition}
            onSplitPositionChange={setSplitPosition}
          >
            <div ref={editorRef} className="h-full">
              <Editor />
            </div>
            <div ref={previewRef} className="h-full">
              <Preview markdown={debouncedMarkdown} />
            </div>
          </ResizableSplit>
        )}
      </main>

      {/* 底部状态栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <StatusBar />
      </div>
    </div>
  );
}

/**
 * 主应用组件
 */
function App() {
  return (
    <EditorProvider>
      <AppContent />
    </EditorProvider>
  );
}

export default App;
