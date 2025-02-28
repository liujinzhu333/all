<template>
  <el-card shadow="always"
    :title="``"
  >
    <template #header>
      <div class="card-header">
        <span>数据表({{name}})数据</span>
      </div>
    </template>
    <el-button @click="openModal()">添加</el-button>
    <el-table :data="tableInfoList" style="width: 100%" border>
      <el-table-column
        v-for="item in columns"
        :label="item.title"
        :prop="item.key"
      >
        <template #default="scope">
          <div v-if="item.key === 'action'">
            <el-link type="primary" :icon="Edit" @click="openModal(scope.row)">
              修改
            </el-link>
            <el-link type="danger" :icon="Delete" style="margin-left: 10px;" @click="delData(scope.row)">
              删除
            </el-link>
          </div>
          <el-text v-else>
            {{ scope.row[item.key] }}
          </el-text>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    v-model="dialogVisible"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item
        v-for="item in tableInfoColumn"
        :label="item.title"
      >
        <el-input v-model="form[item.key]" 
        :disabled="item.key === 'id'" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
  import { computed, ref, watch } from 'vue'
  import { Edit, Delete } from '@element-plus/icons-vue'
  import manageService from '@/services/manageService'

  const props = withDefaults(defineProps<{
    name: string
    tableInfoColumn: any[]
  }>(), {

  })
  
  const tableInfoList = ref()
  const form = ref<any>({})

  const columns = computed(() => (props.tableInfoColumn ? [...props.tableInfoColumn, {
    title: '操作',
    key: 'action'
  }]: []))

  const getList = async () => {
    tableInfoList.value = await manageService.getDataList(props.name, {})
  }

  const addData = async () => {
    await manageService.addDataItem(props.name, form.value)
    getList()
  }
  const updateData = async () => {
    await manageService.updateDataItem(props.name, form.value)
    getList()
  }
  const delData = async (row: any) => {
    await manageService.deleteDataItem(props.name, row.id)
    getList()
  }

  const dialogVisible = ref(false)
  const openModal = (item?: any) => {
    form.value = item ? {
      ...item
    } : {}
    dialogVisible.value = true
  }
  const handleConfirm = async () => {
    if (form.value.id) {
      await updateData()
    } else {
      await addData()
    }
    dialogVisible.value = false
  }

  watch(() => props.name, () => getList())
  getList()
</script>