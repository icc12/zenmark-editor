import { FormatType } from '../types/editor';

/**
 * Markdown 格式映射
 */
export const FORMAT_MAP: Record<FormatType, { prefix: string; suffix: string; placeholder?: string }> = {
  bold: { prefix: '**', suffix: '**', placeholder: '粗体文字' },
  italic: { prefix: '*', suffix: '*', placeholder: '斜体文字' },
  h1: { prefix: '# ', suffix: '', placeholder: '一级标题' },
  h2: { prefix: '## ', suffix: '', placeholder: '二级标题' },
  h3: { prefix: '### ', suffix: '', placeholder: '三级标题' },
  quote: { prefix: '> ', suffix: '', placeholder: '引用内容' },
  code: { prefix: '`', suffix: '`', placeholder: '代码' },
  codeBlock: { prefix: '```\n', suffix: '\n```', placeholder: '代码块内容' },
  link: { prefix: '[', suffix: '](url)', placeholder: '链接文字' },
  image: { prefix: '!\n[', suffix: '](url)\n', placeholder: '图片描述' },
  list: { prefix: '- ', suffix: '', placeholder: '列表项' },
  checkedList: { prefix: '- [ ] ', suffix: '', placeholder: '任务项' },
};

/**
 * 在光标位置插入格式
 */
export function insertAtCursor(
  text: string,
  format: FormatType,
  cursor: { start: number; end: number }
): { newText: string; newCursor: { start: number; end: number } } {
  const formatConfig = FORMAT_MAP[format];
  if (!formatConfig) return { newText: text, newCursor: cursor };

  const { start, end } = cursor;
  const selectedText = text.substring(start, end);
  const newText = selectedText || formatConfig.placeholder || '';

  const before = text.substring(0, start);
  const after = text.substring(end);

  const result = before + formatConfig.prefix + newText + formatConfig.suffix + after;

  // 计算新光标位置（在格式之后）
  const newCursor = {
    start: start + formatConfig.prefix.length,
    end: start + formatConfig.prefix.length + newText.length,
  };

  return { newText: result, newCursor };
}

/**
 * 获取行号和列号
 */
export function getLineAndColumn(text: string, position: number): { line: number; column: number } {
  const lines = text.substring(0, position).split('\n');
  return {
    line: lines.length,
    column: lines[lines.length - 1].length + 1,
  };
}

/**
 * 统计字数
 */
export function countWords(text: string): number {
  // 匹配中文字符、英文单词、数字
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g) || [];
  const words = text.match(/[a-zA-Z0-9]+/g) || [];
  return chineseChars.length + words.length;
}

/**
 * 统计字符数
 */
export function countCharacters(text: string): number {
  return text.length;
}

/**
 * 解析行数
 */
export function countLines(text: string): number {
  return text.split('\n').length;
}

/**
 * 获取当前行文本
 */
export function getCurrentLine(text: string, position: number): string {
  const lines = text.split('\n');
  let currentPos = 0;
  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 for newline
    if (currentPos + lineLength > position) {
      return lines[i];
    }
    currentPos += lineLength;
  }
  return '';
}

/**
 * 在行首插入
 */
export function insertAtLineStart(text: string, position: number, insertText: string): string {
  const before = text.substring(0, position);
  const after = text.substring(position);

  // 找到当前行的开头
  const lastNewline = before.lastIndexOf('\n');
  const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;

  return text.substring(0, lineStart) + insertText + text.substring(lineStart);
}
