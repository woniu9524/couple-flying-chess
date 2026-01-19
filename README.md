# 情侣飞行棋 (Couples Ludo)

这是一个专为情侣设计的互动飞行棋 Web 应用。不仅保留了经典飞行棋的乐趣，还加入了自定义任务卡、主题管理以及 AI 辅助导入等现代化功能，增进情侣间的互动与趣味。
在线预览：[cpfly.top](https://cpfly.top/)

## ✨ 功能特性

- **自定义主题**: 用户可以创建属于自己的游戏主题，设置特定的惩罚或奖励任务。
- **性别适用范围**: 支持设置主题的适用对象（通用、仅限男方、仅限女方），在游戏配置阶段智能过滤。
- **AI 智能导入**: 支持通过 AI 生成任务列表，并一键导入到主题中，快速丰富游戏内容。
- **本地存储**: 游戏进度和自定义主题自动保存到浏览器本地存储（LocalStorage），随时继续游戏。
- **移动端适配**: 采用响应式设计，完美适配手机端操作体验。

## 🛠️ 技术栈

- **前端框架**: [React](https://react.dev/) (v18)
- **构建工具**: [Vite](https://vitejs.dev/)
- **编程语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式方案**: [Tailwind CSS](https://tailwindcss.com/)
- **图标库**: [Lucide React](https://lucide.dev/)

## 🚀 快速开始

### 环境要求

- Node.js (推荐 v16+)
- npm 或 pnpm

### 安装步骤

1. 克隆项目到本地：
   ```bash
   git clone <repository-url>
   cd ludo
   ```

2. 安装依赖：
   ```bash
   npm install
   # 或者
   pnpm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   # 或者
   pnpm dev
   ```

4. 打开浏览器访问 `http://localhost:5173` 即可开始体验。

## 📂 项目结构

```
src/
├── components/         # UI 组件
│   ├── modals/         # 弹窗组件 (主题创建、编辑、AI导入等)
│   ├── views/          # 页面视图 (首页、游戏页、主题列表页)
│   └── ...             # 其他基础组件 (骰子、棋盘等)
├── data/               # 静态数据 (默认主题)
├── hooks/              # 自定义 Hooks (游戏状态管理 useGameState)
├── types/              # TypeScript 类型定义
├── utils/              # 工具函数 (游戏逻辑、存储处理)
├── App.tsx             # 根组件
└── main.tsx            # 入口文件
```

## 🎮 玩法说明

1. **配置阶段**: 双方玩家选择各自的代表角色（男方/女方）及游戏主题。
2. **主题管理**: 在“主题库”中可以新建主题，手动添加任务或通过 AI 批量导入任务。
3. **游戏进行**: 轮流掷骰子移动棋子，触发格子事件或完成任务卡挑战。
4. **胜利条件**: 率先到达终点的玩家获胜。


## 📄 许可证

MIT License
