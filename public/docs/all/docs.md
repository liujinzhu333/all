---
title: 文档
---

### 说明

简单实现文档系统，展示技术文档，系统说明

### 实现

使用`marked dompurify`作为文档的展示


使用`node.js`的`fs、path`模块读取文档树生成文档目录  
使用`gray-matter`读取文档元数据  
使用`fs.writeFile`生成目录json文件  

使用命令`npm run docs`生成

