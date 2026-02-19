/**
 * 键盘快捷键工具函数
 */

export interface Hotkey {
  key: string;
  ctrl?: boolean;
  cmd?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

/**
 * 默认快捷键配置
 */
export const DEFAULT_HOTKEYS: Hotkey[] = [
  {
    key: 'b',
    cmd: true,
    ctrl: true,
    action: () => console.log('粗体'),
    description: '粗体',
  },
  {
    key: 'i',
    cmd: true,
    ctrl: true,
    action: () => console.log('斜体'),
    description: '斜体',
  },
  {
    key: 's',
    cmd: true,
    ctrl: true,
    action: () => console.log('保存'),
    description: '保存',
  },
  {
    key: '`',
    cmd: true,
    ctrl: true,
    action: () => console.log('代码'),
    description: '代码',
  },
  {
    key: 'Escape',
    action: () => console.log('退出'),
    description: '退出专注模式/关闭模态框',
  },
];

/**
 * 检查快捷键是否匹配
 */
export function matchHotkey(event: KeyboardEvent, hotkey: Hotkey): boolean {
  // 检查键名（不区分大小写）
  const keyMatch = event.key.toLowerCase() === hotkey.key.toLowerCase();

  // 检查修饰键
  const ctrlMatch = hotkey.ctrl === undefined || event.ctrlKey === hotkey.ctrl;
  const cmdMatch = hotkey.cmd === undefined || event.metaKey === hotkey.cmd;
  const shiftMatch = hotkey.shift === undefined || event.shiftKey === hotkey.shift;
  const altMatch = hotkey.alt === undefined || event.altKey === hotkey.alt;

  return keyMatch && ctrlMatch && cmdMatch && shiftMatch && altMatch;
}

/**
 * 触发匹配的快捷键
 */
export function triggerHotkey(event: KeyboardEvent, hotkeys: Hotkey[]): boolean {
  for (const hotkey of hotkeys) {
    if (matchHotkey(event, hotkey)) {
      event.preventDefault();
      hotkey.action();
      return true;
    }
  }
  return false;
}

/**
 * 格式化快捷键显示文本
 */
export function formatHotkey(hotkey: Hotkey): string {
  const parts: string[] = [];

  if (hotkey.ctrl || hotkey.cmd) parts.push(isMac() ? '⌘' : 'Ctrl');
  if (hotkey.shift) parts.push('Shift');
  if (hotkey.alt) parts.push(isMac() ? '⌥' : 'Alt');

  // 特殊按键处理
  let key = hotkey.key;
  switch (key.toLowerCase()) {
    case ' ':
      key = isMac() ? '␣' : 'Space';
      break;
    case 'escape':
      key = 'Esc';
      break;
    case 'enter':
      key = isMac() ? '↩' : 'Enter';
      break;
    case 'tab':
      key = 'Tab';
      break;
    case 'backspace':
      key = 'Backspace';
      break;
    case 'delete':
      key = 'Delete';
      break;
    case 'arrowup':
      key = '↑';
      break;
    case 'arrowdown':
      key = '↓';
      break;
    case 'arrowleft':
      key = '←';
      break;
    case 'arrowright':
      key = '→';
      break;
    default:
      // 单字符大写显示
      if (key.length === 1) {
        key = key.toUpperCase();
      }
  }

  parts.push(key);
  return parts.join('+');
}

/**
 * 检测是否为 Mac 系统
 */
export function isMac(): boolean {
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

/**
 * 获取格式化快捷键说明
 */
export function getShortcutText(shortcut: string): string {
  const parts = shortcut.split('+');
  return parts.map((part, index) => {
    const p = part.trim().toLowerCase();
    if (p === 'ctrl' || p === 'cmd') return isMac() ? '⌘' : 'Ctrl';
    if (p === 'shift') return 'Shift';
    if (p === 'alt') return isMac() ? '⌥' : 'Alt';
    if (p === 'meta') return '⌘';
    return part.toUpperCase();
  }).join('+');
}
