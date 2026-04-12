# 现代化 JSON 简历完整指南

> 告别传统的 Word 简历，拥抱程序员友好的 JSON Resume。

## 项目说明

这个仓库使用 JSON Resume 数据文件维护简历内容，并使用 `jsonresume-theme-even` 生成静态 HTML 页面。

当前仓库中有三份简历源文件：

- `my_resume.json`：默认版本
- `zh-resume.json`：中文版本
- `en-resume.json`：英文版本

## 当前推荐的本地使用方式

### 环境要求

- Node.js 20
- npm 10 或兼容版本

### 安装依赖

```bash
npm install
```

### 构建静态页面

```bash
npm run build
```

构建完成后会在 `dist/` 下生成以下文件：

- `dist/index.html`
- `dist/resume.html`
- `dist/zh/index.html`
- `dist/zh-resume.html`
- `dist/en/index.html`
- `dist/en-resume.html`

### 本地预览

```bash
npm run serve
```

默认会启动在：

```text
http://127.0.0.1:4173
```

### 清理构建产物

```bash
npm run clean
```

## 为什么不再使用 `npx resumed render`

当前这套依赖组合下：

- `resumed`
- `jsonresume-theme-even`
- `@rbardini/html`

在本机环境里存在兼容性问题，直接运行下面这些命令会失败：

```bash
npx resumed render my_resume.json -o resume.html -t jsonresume-theme-even
npx resumed render zh-resume.json -o zh-resume.html -t jsonresume-theme-even
npx resumed render en-resume.json -o en-resume.html -t jsonresume-theme-even
```

典型报错如下：

```text
Could not load theme jsonresume-theme-even. Is it installed?
```

因此当前仓库已经改为直接调用 `jsonresume-theme-even` 的 Node API 进行构建，这也是现在唯一经过验证可用的构建方式。

## JSON Resume 文件结构

JSON Resume 遵循标准 schema，主要包含以下部分：

```json
{
  "$schema": "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
  "basics": {
    "name": "你的姓名",
    "label": "职位标签",
    "image": "头像 URL",
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

## 参考资源

- [JSON Resume 官网](https://jsonresume.org/)
- [JSON Resume Schema](https://github.com/jsonresume/resume-schema)
- [jsonresume-theme-even](https://www.npmjs.com/package/jsonresume-theme-even)
- [resumed GitHub 仓库](https://github.com/rbardini/resumed)


