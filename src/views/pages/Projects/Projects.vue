<template>
  <div>
    <div>
      <el-space wrap
      :fill-ratio="25"
      >
        <el-card  v-for="item in dataList" :span="6" style="min-width: 200px;">
          <el-space>
            <el-text>
              {{item.name}}
            </el-text>
            <el-tag v-if="item.status === 1" type="primary">进行中</el-tag>
            <el-tag v-else-if="item.status === 2" type="success">已完成</el-tag>
            <el-tag v-else-if="item.status === 0" type="info">待开始</el-tag>
            <el-tag v-else-if="item.status === 3" type="warning">暂停</el-tag>
            <el-tag v-else-if="item.status === 4" type="danger">废弃</el-tag>
          </el-space>
          <template #footer>
            <el-space>
              <el-link v-if="item.url" :href="item.url" target="_blank">演示地址</el-link>
              <el-link v-if="item.github" :href="item.github" target="_blank">github</el-link>
            </el-space>
          </template>
        </el-card>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import manageService from '@/services/manageService';

  const dataList = ref<any>([])
  const getList = async () => {
    const data = await manageService.getDataList('project') || []
    dataList.value = data
  }
  getList()
  let data = [
    {
      title: '单页简历',
      viewLink: '',
      gitHub: '',
    },
    {
      title: '个人网站',
      viewLink: '',
      gitHub: '',
    },
    {
      title: '微信小程序',
      viewLink: '',
      gitHub: '',
    },
    {
      title: 'vscode插件',
      viewLink: '',
      gitHub: '',
    },
    
  ]

</script>