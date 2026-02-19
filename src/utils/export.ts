/**
 * 导出功能工具函数
 */

/**
 * 生成 HTML 文档
 */
export function generateHTML(markdown: string, title: string = '文档'): string {
  // 基础 HTML 模板
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #24292f;
      background: #ffffff;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
    }
    h1 { font-size: 2em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #d0d7de; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(175, 184, 193, 0.2);
      border-radius: 6px;
      font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
    }
    pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 6px;
    }
    pre code {
      background-color: transparent;
      padding: 0;
    }
    blockquote {
      padding: 0 1em;
      color: #57606a;
      border-left: 0.25em solid #d0d7de;
      margin: 0;
    }
    table {
      border-spacing: 0;
      border-collapse: collapse;
      margin-top: 0;
      margin-bottom: 16px;
      display: block;
      width: max-content;
      max-width: 100%;
      overflow: auto;
    }
    table th, table td {
      padding: 6px 13px;
      border: 1px solid #d0d7de;
    }
    table th {
      font-weight: 600;
      background-color: #f6f8fa;
    }
    table tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
    a {
      color: #0969da;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    hr {
      height: 0.25em;
      padding: 0;
      margin: 24px 0;
      background-color: #d0d7de;
      border: 0;
    }
    input[type="checkbox"] {
      margin-right: 0.5em;
    }
    @media print {
      body {
        max-width: 100%;
        padding: 0;
      }
    }
  </style>
</head>
<body>
  ${markdown}
</body>
</html>`;
}

/**
 * 导出为 HTML 文件
 */
export function exportAsHTML(markdown: string, title: string = '文档'): void {
  const html = generateHTML(markdown, title);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * 导出为 PDF（使用打印）
 */
export function exportAsPDF(): void {
  window.print();
}

/**
 * 导出为 Markdown 文件
 */
export function exportAsMarkdown(markdown: string, title: string = '文档'): void {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * 复制为 Markdown
 */
export function copyAsMarkdown(markdown: string): void {
  navigator.clipboard.writeText(markdown).then(() => {
    console.log('Markdown 已复制到剪贴板');
  }).catch((err) => {
    console.error('复制失败:', err);
  });
}

/**
 * 复制为 HTML
 */
export function copyAsHTML(html: string): void {
  navigator.clipboard.writeText(html).then(() => {
    console.log('HTML 已复制到剪贴板');
  }).catch((err) => {
    console.error('复制失败:', err);
  });
}

/**
 * 下载文件通用函数
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
