<template>
  <div class="year-item">
    <MonthItem
      v-for="month in monthList"
      :year="year"
      :month="month"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import MonthItem from './MonthItem.vue'

  const props = withDefaults(defineProps<{
    type?: string
    year?: string|number
  }>(), {
    year: new Date().getFullYear(),
  })

  const month = new Date().getMonth() + 1

  const monthList = computed(() => props.type==='month' ? [month] : 12 )
  
</script>
<style scoped>
.year-item{
  /* display: flex; */
}

</style>