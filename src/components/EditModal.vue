<template>
  
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import manageService from '@/services/manageService'

const props = withDefaults(defineProps<{
  visible: boolean
  table: string
  tableInfo?: any
}>(), {
  visible: false
})

// 获取tableInfo
// 数据数据
const tableInfo = ref({})

const getInfo = () => {
  const tableInfo = manageService.getTableInfo(props.table)
}
</script>