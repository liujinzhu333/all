<template>
  <div class="calender">
    <div>{{ year }}</div>
    <YearItem
      :year="year"
      type="month"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import YearItem from './YearItem.vue'

  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  
</script>
<style scoped>

</style>