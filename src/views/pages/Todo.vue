<template>
  <div style="max-width: 1000px; margin: 0 auto;">
    <ElCard>
      <ElInput clearable placeholder="创建待办项" v-model="todo" @keydown.enter="addTodo"/>
    </ElCard>
    <ElCard class="list-filter">
      <div style="display: flex; align-items: center; gap: 4px; justify-content: space-between;">
        <ElSelect
          v-model="filterStatus"
          placeholder="默认"
          :options="statusOptions"
          style="width: 100px;"
          @change="getDataList"
        />
        <ElButton type="primary" @click="copyTodo">复制</ElButton>
        <ElButton type="primary" @click="copyAddTodo">粘贴</ElButton>
        <ElCheckbox v-model="showArchive" @change="getDataList">显示已归档</ElCheckbox>
      </div>
    </ElCard>
    <ElCard class="list-box"> 
      <template
        v-for="(item, index) in todos"
        :key="index"
      >
        <ElDivider v-if="index != 0" style="margin: 10px 0;"/>
        <div
          @click="updateItem(item)"
          style="height: 32px; display: flex; align-items: center; justify-content: space-between; padding: 5px 0;"
        >
          <div style="display: flex;align-items: center;gap: 4px;">
            <ElCheckbox v-if="!item.archive" :model-value="item.status" :true-value="2" />
            <ElText v-if="item.status === 2 && !item.archive" tag="del" type="info" style="cursor: pointer;">
              {{ item.title }}
            </ElText>
            <ElText v-else style="cursor: pointer;">
              {{ item.title }}
            </ElText>
          </div>
          <div class="right-action">
            <el-icon style="cursor: pointer;" @click.stop="archiveItem(item)"><Finished /></el-icon>
            <el-icon style="cursor: pointer;" @click.stop="delItem(item.id)"><Close /></el-icon>
          </div>
        </div>
      </template>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import manageService from '@/services/manageService'
  import { useClipboard } from '@vueuse/core'
  import { ElCard, ElCheckbox, ElDivider, ElInput, ElButton, ElSelect } from 'element-plus'

  const { copy } = useClipboard()
  const todo = ref('')
  const filterStatus = ref('all')
  const showArchive = ref(false)
  const todos = ref<any[]>([
    {
      id: 0,
      title: 'todo页面',
      status: 1,
    }
  ])
  const statusOptions = [
    { label: '全部', value: 'all' },
    { label: '未完成', value: 1 },
    { label: '已完成', value: 2 },
  ]

  async function getDataList() {
    const res = await manageService.getDataList('todos', {
      status: filterStatus.value === 'all' ? [1, 2] : filterStatus.value,
      archive: showArchive.value ? 1 : 0,
    })
    todos.value = res||[]
  }
  async function addTodo() {
    await manageService.addDataItem('todos', {
      title: todo.value,
      status: 1,
    })
    todo.value = ''
    getDataList()
  }
  async function copyTodo() {
    const data = await manageService.getOfflineData('todos')
    copy(JSON.stringify(data))
  }
  async function copyAddTodo() {
    const text = await navigator.clipboard.readText()
    const data = JSON.parse(text) || []
    for(const item of data) {
      if(item.add) {
        manageService.addDataItem('todos', {
          title: item.title,
          status: item.status,
        })
      } else {
        manageService.updateDataItem('todos', item)
      }
    }
  }
  async function delItem(id: number) {
    await manageService.deleteDataItem('todos', id)
    getDataList()
  }
  async function updateItem(item: any) {
    if (item.archive) return
    await manageService.updateDataItem('todos', {
      ...item,
      status: item.status === 1 ? 2 : 1,
    })
    getDataList()
  }
  async function archiveItem(item: any) {
    await manageService.updateDataItem('todos', {
      ...item,
      archive: item.archive === 1 ? 0 : 1,
    })
    getDataList()
  }

  onMounted(() => {
    getDataList()
  })
</script>
<style scoped>
.list-box{
  margin-top: 20px;
  max-height: 100vh;
  overflow-y: auto;
  position: relative;
}
.list-filter {
  margin-top: 20px;
  position: sticky;
  top: -20px;
  z-index: 10;
}
.right-action{
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
