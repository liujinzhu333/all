<template>
  <div class="change-log-page">
    <TimeLine
      :list="dataList"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { TimeLine } from '@/components/Base'

const dataList = ref([
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