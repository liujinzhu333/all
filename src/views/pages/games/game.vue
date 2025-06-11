<template>
  <div class="select">
    <el-button
      v-for="item in list"
      @click="selectGame(item)"
    >
      {{ item.title }}
    </el-button>
  </div>
  <div class="game-view">
    <component v-if="curGame" :is="curGame" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import CardPair from './CardPair.vue'
  import Bunchy from './Bunchy.vue'

  const list = [
    {
      title: '数字记忆​',
      is: Bunchy,

    },
    {
      title: '图像配对​',
      is: CardPair,
    },
  ]

  const curGame = ref()

  const selectGame = (item: any) => {
    curGame.value = item.is
  }

</script>
<style scoped>
.select{
}
.game-view {
  margin-top: 20px;
}
</style>