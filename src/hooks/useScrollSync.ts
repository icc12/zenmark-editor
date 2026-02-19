import { useRef, useEffect, useCallback } from 'react';

/**
 * 双向滚动同步 Hook
 * @param editorRef 编辑器容器引用
 * @param previewRef 预览容器引用
 * @param syncPreviewToEditor 是否同步预览到编辑器（默认 false）
 */
export function useScrollSync(
  editorRef: React.RefObject<HTMLElement>,
  previewRef: React.RefObject<HTMLElement>,
  syncPreviewToEditor: boolean = false
) {
  const isEditorScrolling = useRef(false);
  const isPreviewScrolling = useRef(false);
  const scrollTimeoutRef = useRef<number>();

  // 计算滚动百分比
  const getScrollPercentage = (element: HTMLElement): number => {
    if (!element) return 0;
    const { scrollTop, scrollHeight, clientHeight } = element;
    return scrollTop / (scrollHeight - clientHeight);
  };

  // 设置滚动位置
  const setScrollPosition = (element: HTMLElement, percentage: number) => {
    const { scrollHeight, clientHeight } = element;
    element.scrollTop = percentage * (scrollHeight - clientHeight);
  };

  // 编辑器滚动处理
  const handleEditorScroll = useCallback(() => {
    if (isPreviewScrolling.current || !editorRef.current || !previewRef.current) return;

    isEditorScrolling.current = true;

    // 使用 requestAnimationFrame 确保平滑滚动
    requestAnimationFrame(() => {
      const percentage = getScrollPercentage(editorRef.current!);
      setScrollPosition(previewRef.current!, percentage);

      // 重置滚动标志
      scrollTimeoutRef.current = window.setTimeout(() => {
        isEditorScrolling.current = false;
      }, 50);
    });
  }, [editorRef, previewRef]);

  // 预览滚动处理
  const handlePreviewScroll = useCallback(() => {
    if (!syncPreviewToEditor || isEditorScrolling.current || !editorRef.current || !previewRef.current) return;

    isPreviewScrolling.current = true;

    requestAnimationFrame(() => {
      const percentage = getScrollPercentage(previewRef.current!);
      setScrollPosition(editorRef.current!, percentage);

      scrollTimeoutRef.current = window.setTimeout(() => {
        isPreviewScrolling.current = false;
      }, 50);
    });
  }, [editorRef, previewRef, syncPreviewToEditor]);

  // 清理
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    handleEditorScroll,
    handlePreviewScroll,
  };
}
