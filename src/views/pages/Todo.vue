<template>
  <div style="max-width: 1000px; margin: 0 auto;">
    <ElCard>
      <ElInput clearable placeholder="创建待办项" v-model="todo" @keydown.enter="addTodo"/>
    </ElCard>
    <ElCard style="margin-top: 20px;">
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
            <ElCheckbox :model-value="item.status" :true-value="2" />
            <ElText v-if="item.status === 2" tag="del" type="info" style="cursor: pointer;">
              {{ item.title }}
            </ElText>
            <ElText v-else style="cursor: pointer;">
              {{ item.title }}
            </ElText>
          </div>
          <el-icon style="cursor: pointer;" @click.stop="delItem(item.id)"><Close /></el-icon>
        </div>
      </template>
    </ElCard>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import manageService from '@/services/manageService'
import { ElCard, ElCheckbox, ElDivider, ElInput } from 'element-plus'

const todo = ref('')
  const todos = ref([
    {
      id: 0,
      title: 'todo页面',
      status: 1,
    }
  ])

  async function getDataList() {
    const res = await manageService.getDataList('todos')
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
  async function delItem(id: number) {
    await manageService.deleteDataItem('todos', id)
    getDataList()
  }
  async function updateItem(item: any) {
    await manageService.updateDataItem('todos', {
      ...item,
      status: item.status === 1 ? 2 : 1,
    })
    getDataList()
  }

  onMounted(() => {
    getDataList()
  })
</script>
<style scoped>
</style>
