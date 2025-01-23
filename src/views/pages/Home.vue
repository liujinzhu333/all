<template>
  <div class="home-page">
    <Card
      style="flex: 1;"
      title="我的工作台"
    >
      <div style="margin-bottom: 15px;">
        <Button>待办</Button>
      </div>
      <div >
        <Tree
          :list="planList"
        >
          <template #title="{ treeNode }">
            {{ treeNode.title }}
            <Tag>{{ treeNode.status }}</Tag>
          </template>
        </Tree>
      </div>
    </Card>
    <Card
      style="width: 200px;"
      title="每日资讯"
    >
        
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Card, Tag, Tree, Button } from '@/components/Base'

const planList = ref<any[]>([])

function getPlan() {
  planList.value = [
    {
      title: '首页-工作台-UI',
      type: '技术',
      status: '进行中',
      children: [
        {
          title: '卡片组件Card',
          status: '完成',
        },
        {
          title: '标签组件Tag',
          status: '完成',
        },
        {
          title: '树形控件Tree',
          status: '完成',
        },
        {
          title: '按钮Button',
          status: '未开始',
        },
      ]
    },
    {
      title: '首页-工作台',
      type: '技术',
      status: '未开始',
      children: [
        {
          title: '数据格式设计',
          status: '未开始',
        },
        {
          title: '项目数据手动填充',
          status: '未开始',
        },
        {
          title: '功能开发',
          status: '未开始',
        },
      ]
    },
    {
      title: '首页-每日资讯',
      type: '技术',
      status: '未开始',
    },
    {
      title: '驾照体检',
      type: '生活',
      status: '未开始',
    },
    {
      title: '公司体检',
      type: '',
      status: '未开始',
    }
  ]
}
getPlan()

</script>
<style scoped>
.home-page{
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
</style>