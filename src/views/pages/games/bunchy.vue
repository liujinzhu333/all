<template>
  <div @click="start">开始</div>
  <div @click="stop">停止</div>
  {{ list.join('-')}}
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { Timer } from './utils'
  // const num = 
  const num = ref(3)
  const time = ref(0)
  const list = ref<number[]>([])

  const timer = new Timer(1000)

  const start = () => {
    list.value.push(Math.floor(Math.random()*10))
    timer.start()
  }

  const stop = () => {
    timer.stop()
  }

  // const 

// 示例：5秒高精度计时
// highResTimer(5000);

</script>
<style lang="stylus" scoped>

</style>
