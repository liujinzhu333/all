<template>
  <table cellspacing="0">
    <thead>
      <tr>
        <th v-for="item in columnList">
          {{ item.title }}
        </th>
      </tr>
    </thead>
    <tr v-for="row in list">
      <td v-for="item in columnList">
        <slot :name="[item.key]" :row="row">
          {{ row[item.key] }}
        </slot>
      </td>
    </tr>
  </table>
</template>
<script setup lang="ts">
  import { computed } from 'vue'
  const props = withDefaults(defineProps<{
    column: any[]
    list: any[]
  }>(), {

  })
  const columnList = computed(() => props.column||[])
</script>
<style scoped>
table{
  border: 1px solid #ccc;
  thead{
    background: #eee;
  }
}
th,td{
  padding: 5px 10px;
  border: 1px solid #ccc;
}
</style>