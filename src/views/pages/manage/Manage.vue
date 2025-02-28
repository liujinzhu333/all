<template>
  <div class="manage-page">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="always">
          <template #header>
            <!-- 数据库管理 -->
            <Database />
          </template>
            <DataBaseTableNav
              @select="getTableInfo"
            />
        </el-card>
      </el-col>
      <el-col :span="18">
        <TableData
          :name="tableInfo.name"
          :tableInfoColumn="tableInfoColumn"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { Card, Button, Table } from '@/components/Base'
  import manageService from '@/services/manageService'
  import Database from './Database.vue'
  import DataBaseTableNav from './DataBaseTableNav.vue'
  import TableData from './TableData.vue'

  const tableColumn = [
    {
      title: 'cid',
      key: 'cid',
    },
    {
      title: 'name',
      key: 'name',
    },
    {
      title: 'type',
      key: 'type',
    },
    {
      title: 'notnull',
      key: 'notnull',
    },
    {
      title: 'dflt_value',
      key: 'dflt_value',
    },
    {
      title: 'pk',
      key: 'pk',
    },
  ]
  const tableInfoColumn = ref()

  const tableInfo = ref<{
    name: string
    list: any[]
  }>({
    name: '',
    list: [],
  }) // 数据表结构
  
  // 获取数据表结构
  const getTableInfo = async (tableName: string) => {
    tableInfo.value.list = await manageService.getTableInfo(tableName)
    tableInfo.value.name = tableName
    tableInfoColumn.value = tableInfo.value.list.map(item => ({
      title: item.name,
      key: item.name,
    }))
  }
  const addColumn = async () => {
  }

</script>
<style scoped>
.manage-page{
  width: 100%;
}
</style>