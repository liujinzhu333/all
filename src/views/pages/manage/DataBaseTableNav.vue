<template>
  <el-button size="small" type="primary" @click="getAllTable">获取表</el-button>
  <el-button size="small" v-if="canOperate" @click="updateTable()">添加数据表</el-button>
  <el-button size="small" v-if="canOperate" @click="getJson()">导出</el-button>
  <div>
    <div v-for="item in tableList">
      <div class="table-item"
        @click="handleSelect(item)"
      >
        <el-text class="mx-1">{{ item.name }}</el-text>
        <div style="display: flex; gap: 5px;">
          <el-link v-if="canOperate" type="primary" :icon="Edit" @click.stop="updateTable(item)"/>
          <el-link v-if="canOperate" type="danger" :icon="Delete" @click.stop="delTable(item.name)"/>
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="添加数据表"
    width="700"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="数据表">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="数据表名">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-table :data="tableInfoList" style="width: 100%" border>
        <el-table-column
          v-for="item in tableColumn"
          :label="item.title"
          :prop="item.key"
        >
          <template #default="scope">
            <div v-if="scope.row.isAdd && item.isEdit !== false">
              <el-select v-if="item.key === 'type'" v-model="scope.row[item.key]">
                <!-- 文本input -->
                <el-option value="TEXT" />
                <!-- 长文本 textarea -->
                <el-option value="CLOB"/>
                <!-- 数字input -->
                <el-option value="INTEGER" />
                <!-- 文本作select -->
                <el-option value="CHAR" />
                <el-option value="NULL" />
                <el-option value="REAL" />
                <el-option value="BLOB" />
                <!-- 时间 -->
                <el-option value="DATETIME" />
                <el-option value="DATE" />
                <el-option value="HHH" />
              </el-select>
              <el-input v-else v-model="scope.row[item.key]" />
            </div>
            <el-text v-else>
              {{ scope.row[item.key] }}
            </el-text>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="onAddItem">
        添加字段
      </el-button>
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
  import { onMounted, ref, computed } from 'vue'
  import { Edit, Delete } from '@element-plus/icons-vue'
  import manageService from '@/services/manageService'
  import { canOperate } from '@/config'

  const emits = defineEmits(['select'])

  const tableColumn = [
    {
      title: 'cid',
      key: 'cid',
      isEdit: false,
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
    {
      title: 'column',
      key: 'column',
    },
  ]
  const tableList = ref() // 数据表列表
  const tableInfo = ref<any>([])
  const addColumnList = ref<any>([])
  const tableInfoList = computed(() => [...tableInfo.value, ...addColumnList.value])
  // 获取数据列表
  const getAllTable = async () => {
    const res = await manageService.getAllTable() || []
    tableList.value = res
  }

  // 删除数据表
  const delTable = async (tableName: string) => {
    await manageService.delTable(tableName)
    getAllTable()
  }
  // 选择数据表
  const handleSelect = (data: any) => {
    emits('select', data.name)
  }
  // 添加数据表
  const addTable = async () => {
    if (!form.value.name) return
    const keys = tableInfoList.value.filter(item => item.isAdd)
    await manageService.addTable(form.value.name, form.value.title, keys)
    getAllTable()
  }
  // 添加数据表字段
  const addTableColumn = async () => {
    const keys = tableInfoList.value.filter(item => item.isAdd)
    await manageService.addTableColumn(form.value.name, keys)
  }
  // 获取数据表结构
  const getTableInfo = async (tableName: string) => {
    tableInfo.value = await manageService.getTableInfo(tableName)
  }

  const getJson = async () => {
    await manageService.getAllDataJson()
  }

  /** 弹框 */
  const dialogVisible = ref(false)
  const form = ref<{
    name: string
    [key: string]: any
  }>({ name: ''})
  const selectName = ref('')
  const handleClose = () => {
    dialogVisible.value = false
    selectName.value = ''
    addColumnList.value = []
  }
  const updateTable = (item?: any) => {
    if (item) {
      selectName.value = item.name
      form.value = {
        ...item
      }
      getTableInfo(item.name)
    } else {
      form.value = {
        name: ''
      }
      tableInfo.value = []
    }
    dialogVisible.value = true
  }
  const handleConfirm = async () => {
    if (selectName.value) {
      if (selectName.value !== form.value.name) {

      } else {
        await addTableColumn()
      }
    } else {
      await addTable()
    }
    handleClose()
  }

  const onAddItem = () => {
    addColumnList.value.push({
      isAdd: true,
    })
  }

  onMounted(() => {
    getAllTable()
  })
</script>
<style scoped>
.table-item{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover{
    background-color: antiquewhite;
  }
}

</style>