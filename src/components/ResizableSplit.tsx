import { useState, useRef, useEffect, ReactNode } from 'react';

interface ResizableSplitProps {
  children: [ReactNode, ReactNode]; // [editor, preview]
  splitPosition: number;
  onSplitPositionChange: (position: number) => void;
  className?: string;
}

/**
 * 可拖拽分屏组件
 */
export function ResizableSplit({
  children,
  splitPosition,
  onSplitPositionChange,
  className = '',
}: ResizableSplitProps) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 从 localStorage 恢复分屏位置
  useEffect(() => {
    const saved = localStorage.getItem('zenmark-editor-split-position');
    if (saved) {
      onSplitPositionChange(parseInt(saved, 10));
    }
  }, [onSplitPositionChange]);

  // 保存分屏位置到 localStorage
  useEffect(() => {
    localStorage.setItem('zenmark-editor-split-position', splitPosition.toString());
  }, [splitPosition]);

  // 处理鼠标拖动
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    if (!container) return;

    const startX = e.clientX;
    const containerWidth = container.offsetWidth;
    const startSplitWidth = containerWidth * (splitPosition / 100);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newSplitWidth = startSplitWidth + deltaX;
      const newPercentage = (newSplitWidth / containerWidth) * 100;

      // 限制分屏位置在 30% - 70% 之间
      const clampedPosition = Math.max(30, Math.min(70, newPercentage));
      onSplitPositionChange(clampedPosition);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 处理触摸拖动
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    if (!container) return;

    const startX = e.touches[0].clientX;
    const containerWidth = container.offsetWidth;
    const startSplitWidth = containerWidth * (splitPosition / 100);

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const deltaX = moveEvent.touches[0].clientX - startX;
      const newSplitWidth = startSplitWidth + deltaX;
      const newPercentage = (newSplitWidth / containerWidth) * 100;

      const clampedPosition = Math.max(30, Math.min(70, newPercentage));
      onSplitPositionChange(clampedPosition);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div ref={containerRef} className={`flex h-full ${className}`}>
      {/* 左侧编辑器 */}
      <div
        className="h-full overflow-hidden"
        style={{ width: `${splitPosition}%` }}
      >
        {children[0]}
      </div>

      {/* 分隔条 */}
      <div
        className={`
          flex-shrink-0 w-1.5 cursor-col-resize relative
          hover:bg-blue-500 transition-colors
          ${isDragging ? 'bg-blue-500' : 'bg-gray-200 dark:bg-slate-700'}
        `}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'col-resize' : 'col-resize' }}
      >
        {/* 拖动指示器 */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-1 h-8 rounded-full
          ${isDragging ? 'bg-white' : 'bg-gray-400 dark:bg-slate-500'}
          opacity-0 hover:opacity-100 transition-opacity
          ${isDragging ? 'opacity-100' : ''}
        `} />
      </div>

      {/* 右侧预览区 */}
      <div
        className="h-full overflow-hidden flex-1"
        style={{ width: `${100 - splitPosition}%` }}
      >
        {children[1]}
      </div>
    </div>
  );
}
