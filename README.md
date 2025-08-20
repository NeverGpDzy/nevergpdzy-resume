# 现代化 JSON 简历完整指南

> 告别传统的 Word 简历，拥抱程序员友好的 JSON Resume！

## 前言

在管理网站的时候我一直在寻找优雅、易维护的网页简历制作方案，最好样式优美简洁耐看直观并且能直接输出HTML文件。传统的 Word 文档虽然直观，但在版本控制、样式统一、多格式输出等方面存在诸多不便，Latex则更加复杂，并且不好输出HTML。直到我发现了 JSON Resume 和 `resumed` 工具，才真正找到了理想的解决方案。

本文将分享我使用 `resumed` 创建 JSON 简历的完整经验，包括遇到的问题和解决方案。

## 什么是 JSON Resume？

[JSON Resume](https://jsonresume.org/) 是一个开源的简历标准，它使用 JSON 格式来定义简历的结构和内容。这种方式有以下优势：

- **程序员友好**：使用熟悉的 JSON 格式
- **版本控制**：可以轻松使用 Git 管理简历变更
- **主题丰富**：支持多种预制主题
- **多格式输出**：可导出为 HTML、PDF 等格式
- **易于维护**：结构化的数据，修改更加便捷

## 为什么选择 resumed构建工具？

`resumed` 是 `resume-cli` 的现代化重写版本，具有以下特点：

- 🗜️ **轻量级**：仅约 180 行代码
- 📦 **纯 ESM 包**：现代化的模块系统
- 🧩 **CLI 和 Node.js API**：多种使用方式
- 🤖 **TypeScript 支持**：完整的类型定义
- ⏱️ **异步渲染**：支持异步操作
- 🧪 **100% 代码覆盖率**：高质量代码

## 安装和设置

### 1. 初始化项目

首先创建一个新的项目目录：

```bash
mkdir my-resume
cd my-resume
npm init -y
```

### 2. 安装依赖

```bash
npm install resumed jsonresume-theme-even
```

这里我选择了 `jsonresume-theme-even` 主题，你也可以选择其他主题：

- `jsonresume-theme-elegant`
- `jsonresume-theme-paper`
- `jsonresume-theme-short`
- 更多主题可在 [npm](https://www.npmjs.com/search?q=jsonresume-theme) 上搜索

### 3. 创建简历文件

可以使用以下方式创建简历文件：

```bash
# 创建示例简历
npx resumed init my_resume.json

# 或者直接创建自己的简历文件
touch my_resume.json
```

## JSON Resume 文件结构

JSON Resume 遵循标准的 schema，主要包含以下部分：

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "你的姓名",
    "label": "职位标签",
    "image": "头像URL",
    "email": "邮箱",
    "phone": "电话",
    "url": "个人网站",
    "summary": "个人简介",
    "location": {
      "address": "地址",
      "postalCode": "邮编",
      "city": "城市",
      "countryCode": "国家代码",
      "region": "地区"
    },
    "profiles": []
  },
  "work": [],
  "education": [],
  "awards": [],
  "publications": [],
  "skills": [],
  "languages": [],
  "interests": [],
  "references": [],
  "projects": [],
  "certificates": []
}
```

## 渲染导出操作过程

### 1. 验证简历格式

在渲染之前，建议先验证简历文件的格式：

```bash
npx resumed validate my_resume.json
```

**注意**：我在使用过程中遇到了验证错误，但实际上简历格式是正确的。这可能是 `resumed` 工具的一个小 bug。如果遇到类似问题，可以直接尝试渲染。

### 2. 渲染为 HTML

```bash
# 渲染默认
npx resumed render my_resume.json -o resume.html -t jsonresume-theme-even
# 渲染中文版本
npx resumed render zh-resume.json -o zh-resume.html -t jsonresume-theme-even
# 渲染英文版
npx resumed render en-resume.json -o en-resume.html -t jsonresume-theme-even
```

成功后会看到：

```
You can find your rendered resume at resume.html. Nice work! 🚀
```

### 3. 预览效果

```bash
open resume.html  # macOS
# 或在 Windows 上直接双击文件
```

### 4. 导出为 PDF

如果需要 PDF 格式，需要先安装 puppeteer：

```bash
npm install puppeteer
```

然后导出：

```bash
# 渲染默认
npx resumed export my_resume.json -o resume.pdf -t jsonresume-theme-even
# 渲染中文版本
npx resumed export zh-resume.json -o zh-resume.pdf -t jsonresume-theme-even
# 渲染英文版
npx resumed export en-resume.json -o en-esume.pdf -t jsonresume-theme-even
```

**注意**：首次安装 puppeteer 可能需要一些时间，因为它需要下载 Chromium。

## 常见问题和解决方案

### 1. 命令找不到

**问题**：直接运行 `resumed` 命令提示找不到

**解决方案**：使用 npx 或全局安装

```bash
# 推荐使用 npx
npx resumed --help

# 或者全局安装
npm install -g resumed
```

### 2. 验证错误

**问题**：`resumed validate` 报错，提示类型错误

**解决方案**：这可能是工具的 bug，如果简历格式正确，可以直接渲染。验证错误不影响渲染功能。

### 3. PDF 导出失败

**问题**：导出 PDF 时提示找不到 puppeteer

**解决方案**：

```bash
npm install puppeteer
```

### 4. 主题不生效

**问题**：渲染出来的样式不是预期的主题

**解决方案**：确保安装了对应的主题包，并在命令中正确指定主题名称。



## 工作流程自动化

为了更高效地管理简历，可以在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "validate": "resumed validate my_resume.json",
    "build": "resumed render my_resume.json -o resume.html -t jsonresume-theme-even",
    "build:pdf": "resumed export my_resume.json -o resume.pdf -t jsonresume-theme-even",
    "preview": "resumed render my_resume.json -o resume.html -t jsonresume-theme-even && open resume.html",
    "build:all": "npm run build && npm run build:pdf"
  }
}
```

然后可以使用简化的命令：

```bash
npm run validate    # 验证格式
npm run build       # 构建 HTML
npm run build:pdf   # 构建 PDF
npm run preview     # 构建并预览
npm run build:all   # 构建所有格式
```

## 版本控制建议

将简历项目纳入 Git 管理：

```bash
git init
echo "node_modules/" >> .gitignore
echo "*.html" >> .gitignore
echo "*.pdf" >> .gitignore
git add .
git commit -m "Initial resume setup"
```

这样可以：

- 跟踪简历内容的变更历史
- 在不同分支维护不同版本的简历
- 与团队分享简历模板

## 参考资源

- [JSON Resume 官网](https://jsonresume.org/)
- [resumed GitHub 仓库](https://github.com/rbardini/resumed)
- [JSON Resume Schema](https://github.com/jsonresume/resume-schema)
- [主题市场](https://jsonresume.org/themes/)


