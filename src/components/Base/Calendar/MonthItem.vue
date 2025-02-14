<template>
  <div class="month-item">
    <div class="month">{{ month }}</div>
    <DayItem
      v-for="item in weekList"
      isTop
      :text="item"
    />
    <DayItem
      v-for="item in monthList"
      :date="item?.date"
      :year="year"
      :month="month"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import DayItem from './DayItem.vue'
  import {
    getMonthList, weekList,
  } from './const'

  const props = withDefaults(defineProps<{
    year: string|number
    month: string|number
  }>(), {
    month: new Date().getMonth() + 1
  })

  const monthList = ref<any[]>([])

  monthList.value = getMonthList(props.year, props.month)

</script>
<style scoped>
.month-item{
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 5px;
  .month {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    opacity: 0.3;
  }
}
</style>