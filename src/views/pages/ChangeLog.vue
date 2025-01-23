<template>
  <div class="change-log-page">
    <h1>记录</h1>
    <div>
      变更记录，生活记录等
    </div>
    <Select
      :options="typeList"
    />
    <Timeline
      :list="dataList"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Timeline, Select } from '@/components/Base'

const typeList = ref([
  '全部', '生活', '技术', '网站', '变更日志'
])

const dataList = ref([
  {
    time: '2025.1.23',
    content: '首页工作台，依赖组件',
  },
  {
    time: '2025.1.20',
    content: '架构基本确定，页面区分',
  },
  {
    time: '2025.1.18',
    content: '架构整理, Timeline组件',
  },
  {
    time: '2025.1.17',
    content: '初始化项目，部署构建到github pages',
  }
])

</script>
<style scoped>
.change-log-page{
  margin: 0 auto;
  width: 1000px;
}
</style>