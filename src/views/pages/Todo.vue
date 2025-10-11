<template>
  <div>
    <ElInput v-model="todo" @keydown.enter="addTodo"/>
    <el-button @click="addTodo">添加</el-button>
    <ul>
      <li v-for="item in todos"
        @click="updateItem(item)"
      >
        <ElCheckbox :model-value="item.status" :true-value="2" />
        {{ item.title }}
        <span @click.stop="delItem(item.id)">X</span>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import manageService from '@/services/manageService'
import { ElCheckbox, ElInput } from 'element-plus'

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
