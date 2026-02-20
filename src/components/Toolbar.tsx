import { useState, useRef } from 'react';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Link as LinkIcon,
  Image,
  Copy,
  Download,
  Printer,
  FolderOpen,
} from 'lucide-react';
import { useEditor } from '../context/EditorContext';
import { Modal } from './Modal';
import { ThemeToggle } from './ThemeToggle';
import { exportAsHTML, exportAsMarkdown, copyAsMarkdown } from '../utils/export';
import { insertAtCursor } from '../utils/markdown';

/**
 * 工具栏组件
 */
export function Toolbar() {
  const {
    title,
    setTitle,
    markdown,
    toggleTheme,
    setMarkdown,
    exportPDF
  } = useEditor();

  const [insertImageModal, setInsertImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 格式化按钮配置
  const formatButtons = [
    { icon: Bold, label: '粗体', format: 'bold' },
    { icon: Italic, label: '斜体', format: 'italic' },
    { icon: Heading1, label: '标题1', format: 'h1' },
    { icon: Heading2, label: '标题2', format: 'h2' },
    { icon: Heading3, label: '标题3', format: 'h3' },
    { icon: Quote, label: '引用', format: 'quote' },
    { icon: Code, label: '代码', format: 'code' },
  ];

  // 打开文件处理
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setMarkdown(content);
        setTitle(file.name.replace('.md', '').replace('.txt', ''));
      };
      reader.readAsText(file);
    }
  };

  // 插入格式
  const handleFormat = (format: string) => {
    const { newText } = insertAtCursor(markdown, format as any, { start: markdown.length, end: markdown.length });
    setMarkdown(newText);
  };

  // 插入图片
  const handleInsertImage = () => {
    if (imageUrl) {
      setMarkdown(prev => `${prev}\n\n![图片](${imageUrl})\n`);
      setImageUrl('');
      setInsertImageModal(false);
    }
  };

  // 复制 HTML
  const handleCopyHTML = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      alert('HTML 已复制到剪贴板');
    });
  };

  // 导出选项
  const handleExportHTML = () => {
    exportAsHTML(markdown, title);
    setExportMenuOpen(false);
  };

  const handleExportMarkdown = () => {
    exportAsMarkdown(markdown, title);
    setExportMenuOpen(false);
  };

  const handleExportPDF = () => {
    exportPDF();
    setExportMenuOpen(false);
  };

  const handleCopy = () => {
    copyAsMarkdown(markdown);
  };

  return (
    <>
      {/* 顶部工具栏 */}
      <header
        className="
          fixed top-0 left-0 right-0 h-[50px] flex items-center px-4 gap-3
          bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700
          z-40
        "
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ZenMark
          </span>
        </div>

        {/* 标题输入 */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="文档标题"
          className="
            px-3 py-1.5 text-sm border border-gray-300 dark:border-slate-600 rounded-lg
            bg-white dark:bg-slate-800 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            flex-1 max-w-xs
          "
        />

        {/* 分隔线 */}
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2" />

        {/* 格式化按钮 */}
        <div className="flex items-center gap-1">
          {formatButtons.map((button) => {
            const Icon = button.icon;
            return (
              <button
                key={button.format}
                onClick={() => handleFormat(button.format)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                title={button.label}
              >
                <Icon className="w-4 h-4 text-gray-700 dark:text-slate-300" />
              </button>
            );
          })}
        </div>

        {/* 分隔线 */}
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2" />

        {/* 打开文件按钮 */}
        <button
          onClick={handleOpenFile}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          title="打开文件"
        >
          <FolderOpen className="w-4 h-4 text-gray-700 dark:text-slate-300" />
        </button>

        {/* 隐藏的文件输入框 */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.txt,.markdown"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* 分隔线 */}
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2" />

        {/* 插入按钮 */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setInsertImageModal(true)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            title="插入图片"
          >
            <Image className="w-4 h-4 text-gray-700 dark:text-slate-300" />
          </button>
        </div>

        {/* 分隔线 */}
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2" />

        {/* 导出按钮 */}
        <div className="relative">
          <button
            onClick={() => setExportMenuOpen(!exportMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            title="导出"
          >
            <Download className="w-4 h-4 text-gray-700 dark:text-slate-300" />
          </button>

          {/* 导出菜单 */}
          {exportMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-50"
                onClick={() => setExportMenuOpen(false)}
              />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-1 z-50">
                <button
                  onClick={handleExportMarkdown}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  导出 Markdown
                </button>
                <button
                  onClick={handleExportHTML}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  导出 HTML
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  导出 PDF
                </button>
              </div>
            </>
          )}
        </div>

        {/* 复制按钮 */}
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
          title="复制"
        >
          <Copy className="w-4 h-4 text-gray-700 dark:text-slate-300" />
        </button>

        {/* 分隔线 */}
        <div className="w-px h-6 bg-gray-300 dark:bg-slate-700 mx-2" />

        {/* 主题切换 */}
        <ThemeToggle />
      </header>

      {/* 插入图片模态框 */}
      <Modal
        isOpen={insertImageModal}
        onClose={() => setInsertImageModal(false)}
        title="插入图片"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
              图片 URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="
                w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg
                bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setInsertImageModal(false)}
              className="px-4 py-2 text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              取消
            </button>
            <button
              onClick={handleInsertImage}
              disabled={!imageUrl}
              className="
                px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700
                disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg
              "
            >
              插入
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
