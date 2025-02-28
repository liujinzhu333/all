<template>
  <div style="display: flex;align-items: center;justify-content: space-between;">
    数据库
    <el-switch
      v-if="canOperate"
      v-model="dbStatus"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import manageService from '@/services/manageService'
  import { canOperate } from '@/config'

  const dbStatus = ref(false)

  // 获取数据库状态
  const getDbStatus = async () => {
    const { connected } = await manageService.getDatabaseConnectStatus()
    dbStatus.value = connected
  }

  const connectDatabase = async () => {
    const { connected } = await manageService.connectDatabase()
    dbStatus.value = connected
  }

  const closeConnected = async () => {
    const { connected } = await manageService.closeConnection()
    dbStatus.value = connected
  }
  const handleChange = (value: boolean) => {
    if (value) {
      connectDatabase()
    } else {
      closeConnected()
    }
  }

  onMounted(() => {
    getDbStatus()
  })

</script>