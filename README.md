## 启动指南

要启动此项目，请按照以下步骤操作：

### 1. 克隆仓库

首先，将项目仓库克隆到你的本地机器：

```bash
git clone https://github.com/labixiaoji/IST-Lottery.git
cd IST-Lottery
```

### 2. 安装依赖

进入项目目录后，安装所有必要的依赖：

```bash
npm install
```

### 3. 运行开发服务器

安装完依赖后，你可以启动开发服务器：

```bash
npm run dev
```

这将在本地启动一个开发服务器，通常在 `http://localhost:5173` 或其他可用端口。你可以在浏览器中打开此地址来查看应用程序。

### 4. 构建生产版本

如果你想为生产环境构建应用程序：

```bash
npm run build
```

这将在 `dist` 文件夹中生成一个优化过的生产版本。

### 5. 预览生产版本

构建完成后，你可以本地预览生产版本：

```bash
npm run preview
```