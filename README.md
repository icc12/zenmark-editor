# ZenMark Editor

> 一个功能完备的 Markdown 文本编辑器，支持实时预览、语法高亮和同步滚动。

![ZenMark Editor](https://img.shields.io/badge/ZenMark-Editor-blue)
![React](https://img.shields.io/badge/React-18.3.1-cyan)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.11-purple)

## ✨ 功能特性

### 核心功能
- **实时预览** - 输入时即时渲染 Markdown（150ms 防抖优化）
- **语法高亮** - CodeMirror 编辑器 + highlight.js 代码高亮
- **同步滚动** - 编辑器和预览区双向同步滚动
- **分屏编辑** - 可拖拽调整编辑器/预览区大小
- **主题切换** - 支持浅色/深色模式
- **本地持久化** - 自动保存内容到 localStorage

### Markdown 支持
- CommonMark 标准
- GitHub Flavored Markdown (GFM)
- 表格支持
- 任务列表 `[ ]`
- 删除线 `~~`
- 代码块语法高亮
- 自动链接识别

### 文件操作
- 导出为 Markdown (.md)
- 导出为 HTML (.html)
- 导出为 PDF（打印）
- 复制 Markdown 到剪贴板
- 拖放文件导入

### 用户体验
- **专注模式** - 隐藏工具栏和状态栏，无干扰写作
- **响应式布局** - 移动端标签页切换模式
- **键盘快捷键** - 高效编辑支持
- **状态栏** - 实时显示字数、字符数和光标位置

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173/

### 生产构建

```bash
npm run build
```

### 预览构建

```bash
npm run preview
```

## 📖 使用指南

### 界面介绍

```
┌─────────────────────────────────────────────────────────────┐
│  ZenMark  [标题输入]  粗 斜 H1 H2 H3 引 代  图 导 出 🌙 👁️ │  工具栏
├────────────────────────┬────────────────────────────────────┤
│                        │                                    │
│   # 标题               │   标题                             │
│                        │                                    │
│   **粗体**             │   粗体                             │
│                        │                                    │
│   [编辑器区域]         │   [预览区域]                       │
│   (可拖拽调整大小)     │   (自动滚动同步)                   │
│                        │                                    │
├────────────────────────┴────────────────────────────────────┤
│  123 字  456 字符          行 12 : 列 8                     │  状态栏
└─────────────────────────────────────────────────────────────┘
```

### 工具栏功能

| 按钮 | 功能 | 快捷键 |
|------|------|--------|
| **B** | 粗体 | `Ctrl/Cmd + B` |
| *I* | 斜体 | `Ctrl/Cmd + I` |
| H1 | 一级标题 | - |
| H2 | 二级标题 | - |
| H3 | 三级标题 | - |
| 引 | 引用 | - |
| </> | 代码 | `Ctrl/Cmd + `` |
| 🖼️ | 插入图片 | - |
| ⬇️ | 导出选项 | - |
| 📋 | 复制 | - |
| 🌙 | 切换主题 | - |
| 👁️ | 专注模式 | `Esc` 退出 |

### Markdown 语法示例

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*
~~删除线~~

> 引用文字

`行内代码`

```javascript
// 代码块
function hello() {
  console.log("Hello, ZenMark!");
}
```

- 无序列表项
- 列表项

1. 有序列表项
2. 列表项

- [ ] 任务列表未完成
- [x] 任务列表已完成

| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |

[链接文字](https://example.com)

![图片描述](https://example.com/image.png)

---
分割线
```

### 键盘快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + B` | 插入/切换粗体 |
| `Ctrl/Cmd + I` | 插入/切换斜体 |
| `Ctrl/Cmd + `` ` | 插入/切换代码 |
| `Ctrl/Cmd + S` | 保存文件 |
| `Esc` | 退出专注模式 / 关闭模态框 |

### 专注模式

点击工具栏右侧的 👁️ 图标进入专注模式：

- ✅ 隐藏顶部工具栏
- ✅ 隐藏底部状态栏
- ✅ 全屏专注写作
- ✅ 按 `Esc` 退出

### 分屏调整

拖动编辑器和预览区之间的分隔条，可以调整左右面板宽度：
- 最小：30%
- 最大：70%
- 位置自动保存到 localStorage

### 导出选项

点击导出按钮可选择：

| 选项 | 格式 | 说明 |
|------|------|------|
| 导出 Markdown | `.md` | 原始 Markdown 文件 |
| 导出 HTML | `.html` | 带样式的 HTML 文件 |
| 导出 PDF | `.pdf` | 通过浏览器打印功能 |

## 🎨 主题

### 浅色模式
- 背景：`#ffffff`
- 文字：`#374151`
- 强调色：`#2563eb`

### 深色模式
- 背景：`#1e293b`
- 文字：`#e2e8f0`
- 强调色：`#3b82f6`

## 📁 项目结构

```
zenmark-editor/
├── src/
│   ├── components/         # React 组件
│   │   ├── Toolbar.tsx    # 顶部工具栏
│   │   ├── Editor.tsx     # CodeMirror 编辑器
│   │   ├── Preview.tsx    # Markdown 预览
│   │   ├── StatusBar.tsx  # 底部状态栏
│   │   ├── ResizableSplit.tsx  # 可拖拽分屏
│   │   ├── Modal.tsx      # 通用模态框
│   │   └── ThemeToggle.tsx # 主题切换
│   ├── hooks/             # 自定义 Hooks
│   │   ├── useDebounce.ts       # 防抖
│   │   ├── useLocalStorage.ts   # 持久化
│   │   └── useScrollSync.ts     # 滚动同步
│   ├── context/           # React Context
│   │   └── EditorContext.tsx   # 编辑器状态
│   ├── utils/             # 工具函数
│   │   ├── markdown.ts    # Markdown 工具
│   │   ├── export.ts      # 导出功能
│   │   └── hotkeys.ts     # 快捷键
│   ├── types/             # TypeScript 类型
│   │   └── editor.ts
│   ├── App.tsx            # 主应用
│   ├── main.tsx           # 入口
│   └── index.css          # 全局样式
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| TypeScript | 5.6.2 | 类型系统 |
| Vite | 5.4.11 | 构建工具 |
| Tailwind CSS | 3.4.15 | 样式框架 |
| CodeMirror 6 | - | 代码编辑器 |
| react-markdown | 9.0.1 | Markdown 解析 |
| remark-gfm | 4.0.0 | GFM 支持 |
| highlight.js | 11.10.0 | 语法高亮 |
| lucide-react | 0.462.0 | 图标库 |

## 📝 开发说明

### 添加新功能

1. 在 `src/components/` 中创建新组件
2. 在 `src/context/EditorContext.tsx` 中添加状态和操作
3. 在 `src/utils/` 中添加工具函数
4. 在 `src/hooks/` 中添加自定义 Hooks（如需要）

### 样式定制

编辑 `tailwind.config.js` 可自定义主题颜色和字体。

### 快捷键配置

编辑 `src/utils/hotkeys.ts` 可添加或修改键盘快捷键。

## 🔍 常见问题

### Q: 内容没有自动保存？
A: 内容会自动保存到浏览器的 localStorage。清空浏览器缓存会丢失数据。

### Q: 如何恢复默认内容？
A: 在浏览器控制台执行 `localStorage.clear()` 后刷新页面。

### Q: 代码高亮不显示？
A: 确保代码块包含语言标识，如 \`\`\`javascript。

### Q: PDF 导出样式不对？
A: PDF 使用浏览器打印功能，请在打印预览中调整纸张大小和边距。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**ZenMark Editor** - 让 Markdown 写作更优雅 🖋️
