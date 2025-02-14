<template>
  <div class="day-box">
    <div
      v-if="isTop"
      class="day-week-top"
    >
      {{ text }}
    </div>
    <div
      v-else
      class="day"
      :class="{
        'no-cur-month': !isCurMonth,
        'cur': isCurDay,
      }"
    >
      {{ props.date && day }}
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';

  const props = withDefaults(defineProps<{
    isTop?: boolean
    text?: string
    date?: string
    year?: string|number
    month?: string|number
  }>(), {
    
  })
  // 年月日周，农历年月日，节气，节日
  const day = ref<number>(Number(props.date?.split('-')[2]))

  const isCurYear = computed(() => (new Date().getFullYear()) === Number(props.year))
  const isCurMonth = computed(() => isCurYear.value && (new Date().getMonth() + 1) === Number(props.month))
  const isCurDay = computed(() => isCurMonth.value && new Date().getDate() === day.value)

</script>
<style scoped>
.day-box{
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  .day-week-top{
    text-align: center;
  }
  .day{
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    &.no-cur-month {
      color: #999;
    }
    &.cur{
      color: #33aaff;
      font-weight: 500;
      border: 1px solid #ccc;
      &:active{
        background-color: #33aaff;
        color: #fff;
      }
    }
  }
}
</style>