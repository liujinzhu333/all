---
title: 系统
---

### 说明
  包含前端页面和简单后台管理

  分为首页、项目、文档、工具、记录、管理六个页面
### 技术
前端使用
`node` 版本 `v20.10.0`
```
vite vue vue-router axios pinia
element Plus
```
代码上传到github，本地连接后端服务，拥有全部功能，静态网站使用导出的json数据，只有查看功能。

后端使用node
```
express 和 sqlite3
```

启动
```
npm run dev
```
生成 文档目录
```
npm run docs
```
构建
```
npm run build
```
