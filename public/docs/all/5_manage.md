---
title: 管理
---
## 数据库管理


| 表              | 表名     | 说明             |
| --------------- | -------- | ---------------- |
| sqlite_sequence | 基础表   | 数据库自带基础表 |
| dict            | 字典     | 字典             |
| dict_item       | 字典内容 | 字典项           |
| utils           | 工具     | 存储工具表       |
| account         | 账号     |                  |
| plan            | 计划     |                  |
| project         | 项目     |                  |

dict_item 表名称


| dict       | name            | value  |
| ---------- | --------------- | ------ |
| table_name | sqlite_sequence | 基础表 |

## 基础表
### sqlite_sequence
数据库自带表格
| 字段       | 说明            | 
| ---------- | --------------- |
| name | 表名称 | 
| seq | 表数据最大序号
### table_info
在sqlite_sequence基础上扩充
| 字段       | 说明            | 
| ---------- | --------------- |
| name | 表名 | 
| table_name | 表名称
| table_info | 表详情json字段

### 基础逻辑
  - 创建表：创建表同时将表数据存入table_info
  - 查询表结构：查询表结构时同时查询table_info表
  - 修改表数据：查询表结构时同时修改table_info
  - 删除表数据：删除表同时删除table_info中数据
### dict 字典
存储数据字典映射数据，dict存储字典，dict_item存储内容

| 字段       | 说明            | 
| ---------- | --------------- |
| id       | 序号            | 
| name       | 名称            | 
| code       |  码值           | 

包含基础值
| 表              | 表名     | 说明             |
| --------------- | -------- | ---------------- |
| sqlite_sequence | 基础表   | 数据库自带基础表 |

### dict_item 字典
添加数据表

1. 添加表（表/名称）
   `table_name `
   表字段（配置项）
   ``
2. 添加字典
3. 添加字典项
   查询表



### 数据库设计
#### 新增数据表
添加数据表
数据表信息table_info