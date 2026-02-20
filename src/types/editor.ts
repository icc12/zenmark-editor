/**
 * 编辑器状态类型定义
 */

export type ThemeMode = 'light' | 'dark';

export type ViewMode = 'split' | 'editor' | 'preview';

export type CursorPosition = {
  line: number;
  column: number;
};

export interface EditorState {
  markdown: string;           // Markdown 内容
  title: string;              // 文档标题
  theme: ThemeMode;           // 主题模式
  viewMode: ViewMode;         // 视图模式（移动端用）
  splitPosition: number;      // 分屏位置（百分比，30-70）
  cursor: CursorPosition;     // 光标位置
}

export interface EditorActions {
  setMarkdown: (text: string) => void;      // 设置内容
  setTitle: (title: string) => void;         // 设置标题
  toggleTheme: () => void;                   // 切换主题
  setViewMode: (mode: ViewMode) => void;     // 设置视图模式
  setSplitPosition: (position: number) => void; // 设置分屏位置
  setCursor: (position: CursorPosition) => void; // 设置光标位置
  insertFormat: (format: string) => void;     // 插入格式
  insertImage: (url: string) => void;        // 插入图片
  insertLink: (url: string, text?: string) => void; // 插入链接
  openFile: (file: File) => void;            // 打开文件
  saveFile: () => void;                      // 保存文件
  exportHTML: () => void;                    // 导出 HTML
  exportPDF: () => void;                     // 导出 PDF
  copyHTML: () => void;                      // 复制 HTML
  clearAll: () => void;                      // 清空内容
}

export interface EditorContextType extends EditorState, EditorActions {}

export type FormatType =
  | 'bold'
  | 'italic'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'quote'
  | 'code'
  | 'codeBlock'
  | 'link'
  | 'image'
  | 'list'
  | 'checkedList';

export interface ToolbarButton {
  type: FormatType;
  icon: React.ReactNode;
  tooltip: string;
  shortcut?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface InsertImageModalProps extends ModalProps {
  onInsert: (url: string) => void;
}

export interface ExportOptions {
  includeStyles: boolean;
  includeTitle: boolean;
}
