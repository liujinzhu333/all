<template>
  <el-card shadow="always"
    :title="``"
  >
    <template #header>
      <div class="card-header">
        <span>{{ title || '数据表' }}({{name}})数据</span>
      </div>
    </template>
    <el-button v-if="canOperate" @click="openModal()">添加</el-button>
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
          <div v-else style="max-height: 50px;">
            <el-text line-clamp="2">
              {{ scope.row[item.key] }}
            </el-text>
          </div>
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
      <!-- {{item}} -->
        <el-input
          v-if="item.type === 'CLOB'"
          v-model="form[item.key]"
          :rows="2"
          type="textarea"
          placeholder="Please input"
        />
        <el-select
          v-else-if="item.type === 'CHAR'"
          v-model="form[item.key]"
          placeholder="Select"
        >
          <el-option label="测试" value="ce" />
        </el-select>
        <el-date-picker
          v-else-if="item.type === 'DATETIME'"
          v-model="form[item.key]"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="Pick a day"
        />
        <el-input
          v-else
          v-model="form[item.key]" 
          :disabled="item.key === 'id'"
        />
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
  import { canOperate } from '@/config'

  const props = withDefaults(defineProps<{
    title?: string
    name: string
    tableInfoColumn: any[]
  }>(), {

  })
  
  const tableInfoList = ref()
  const form = ref<any>({})

  const columns = computed(() => (props.tableInfoColumn ? (canOperate ? [...props.tableInfoColumn, {
    title: '操作',
    key: 'action'
  }] : props.tableInfoColumn) : []))

  const getList = async () => {
    tableInfoList.value = await manageService.getDataList(props.name)
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