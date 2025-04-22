---
title: Mac脚本
---

使用`.command`文件（双击运行脚本）
1. 新建`.command`文件（如`run.command`）
2. 编辑文件内容
```
#!/bin/bash

# 进入目标目录（如果失败则退出）
cd "/Users/xxx/code/no-name" || exit

# 执行你的命令（示例：列出文件 + 运行 node 脚本）
ls -l
npm run dev

# 防止窗口自动关闭
read -p "Press Enter to exit..."
```