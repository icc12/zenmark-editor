import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import { useEditor } from '../context/EditorContext';

/**
 * Markdown 预览组件
 */
export function Preview({ markdown }: { markdown: string }) {
  const { theme } = useEditor();
  const previewRef = useRef<HTMLDivElement>(null);

  // 监听主题变化，更新代码高亮样式
  useEffect(() => {
    if (previewRef.current) {
      const codeBlocks = previewRef.current.querySelectorAll('pre code');
      // 主题变化时可能需要重新渲染
    }
  }, [theme]);

  return (
    <div
      ref={previewRef}
      className="h-full overflow-auto p-6 prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-transparent prose-pre:p-0"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // 自定义表格样式
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-700"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2 text-sm text-gray-700 dark:text-slate-300 border-t border-gray-200 dark:border-slate-700"
              {...props}
            />
          ),
          // 自定义代码块样式
          pre: ({ node, ...props }) => (
            <pre
              className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto"
              {...props}
            />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code
                className="bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-blue-600 dark:text-blue-400"
                {...props}
              />
            ) : (
              <code {...props} />
            ),
          // 自定义引用样式
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 dark:border-slate-600 pl-4 italic text-gray-700 dark:text-slate-300"
              {...props}
            />
          ),
          // 自定义链接样式
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // 自定义图片样式
          img: ({ node, ...props }) => (
            <img
              className="max-w-full h-auto rounded-lg"
              alt={props.alt || '图片'}
              {...props}
            />
          ),
          // 自定义标题样式
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mb-4 pb-2 border-b border-gray-200 dark:border-slate-700" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mb-3 pb-2 border-b border-gray-200 dark:border-slate-700" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mb-2" {...props} />
          ),
          // 自定义列表样式
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside space-y-1 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside space-y-1 mb-4" {...props} />
          ),
          // 自定义任务列表样式
          input: ({ node, ...props }) => (
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
              disabled
              {...props}
            />
          ),
          // 自定义分割线样式
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-gray-300 dark:border-slate-700" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
