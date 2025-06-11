<template>
  <div>
    <div v-for="item in albums">
      {{ item.title }}
    </div>
    <div></div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import manageService from '@/services/manageService'

  const albums = ref<any>([])

  const getList = async () => {
    const res = await manageService.getDataList('album')
    albums.value = res
  }
  onMounted(() => {
    getList()
  })
</script>
<style lang="stylus" scoped>

</style>
