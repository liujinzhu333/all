<template>
  <el-dialog
    v-model="dialogVisible"
    title="数据管理"
    width="75%"
    :before-close="handleClose"
  >
  <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item v-for="item in tableInfo?.rows" :label="item.column||item.name">
        <el-input v-model="form[item.name]" :disabled="item.name === 'id'"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="form.id" type="danger" @click="handleDelete">删除</el-button>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import manageService from '@/services/manageService'

const emits = defineEmits(['update:visible', 'close', 'confirm', 'delete'])
const props = withDefaults(defineProps<{
  visible: boolean
  table: string
  tableInfo?: any
  data?: any
}>(), {
  visible: false
})

const dialogVisible = ref(false)
// 获取tableInfo
// 数据数据
const tableInfo = ref<any>({})
const form = ref<any>({})

const getInfo = async () => {
  tableInfo.value = await manageService.getTableInfo(props.table)
  tableInfo.value.rows.forEach((item: any) => {
    form.value[item.name] = props.data[item.name]
  })
}
const handleClose = () => {
  emits('update:visible', false)
  emits('close', false)
}
const handleConfirm = async () => {
  if (form.value.id) {
    await manageService.updateDataItem(props.table, form.value)
  } else {
    await manageService.addDataItem(props.table, form.value)
  }
  emits('update:visible', false)
  emits('confirm')
}
const handleDelete = async () => {
  await manageService.deleteDataItem(props.table, form.value.id)
  emits('update:visible', false)
  emits('delete')
}
watch(() => props.visible, () => {
  dialogVisible.value = props.visible
  if (props.visible) {
    getInfo()
  }
})
</script>