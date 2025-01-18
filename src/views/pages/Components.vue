<template>
  <div class="components-page">
    <div
      v-for="item in dataList"
    >
      <h3>{{item.title}}</h3>
      <div
        v-if="item.children"
        class="components-item-list"
      >
        <Card
          v-for="itemC in item.children"
          class="components-item"
        >
          {{itemC.name}} - {{itemC.status}}
        </Card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from '@/components/Base'
  import All from '@/components/Base'
  const dataList = [
    {
      title: '通用',
      children: [
        {
          name: '按钮',
          value: 'Button',
          component: All.Button,
          status: '待开发',
        },
        {
          name: '图标',
          value: 'Icon',
          status: '待开发',
        },
        {
          name: '链接',
          value: 'Link',
          status: '待开发',
        }
      ]
    },
    {
      title: '布局',
      children: [
        {
          name: '布局',
          value: 'Layout',
          status: '待开发',
        },
      ]
    },
    {
      title: '导航',
      children: [
        {
          name: '图钉',
          value: 'Affix',
          status: '待开发',
        },
        {
          name: '面包屑',
          value: 'Breadcrumb',
          status: '待开发',
        },
        {
          name: '分页',
          value: 'Pagination',
          status: '待开发',
        },
      ]
    },
    {
      title: '数据展示',
      children: [
        {
          name: '头像',
          value: 'Avatar',
          status: '待开发',
        },
        {
          name: '卡片',
          value: 'Card',
          status: '待开发',
        },
        {
          name: '时间轴',
          value: 'Timeline',
          status: '开发中',
        },
        {
          name: '标签',
          value: 'Tag',
          status: '待开发',
        },
        {
          name: '进度条',
          value: 'Progress',
          status: '待开发',
        },
        {
          name: '文字气泡',
          value: 'Tooltip',
          status: '待开发',
        },
      ]
    },
    {
      title: '交互',
      children: [
        {
          name: '对话框',
          value: 'Modal',
          status: '待开发',
        },
        {
          name: '提示',
          value: 'Toast',
          status: '待开发',
        },
        {
          name: '进度条',
          value: 'progress',
          status: '待开发',
        },
      ]
    }
  ]
</script>
<style scoped>
.components-page{
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.components-item-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  .components-item{
    width: 200px;
  }
}
</style>