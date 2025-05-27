<template>
  <div class="action">
    <el-input-number
      v-model="num"
      @change="changeNum"
    />
    <el-switch v-model="isLock"/>
    {{ bestTotal }} - {{ total }}
  </div>
  <div class="warp">
    <div
      class="card-list"
      :style="{
        gridTemplateColumns: `repeat(${column}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
      }"
    >
      <div
        v-for="item in cardList"
        class="card"
        :class="{
          'card-ok': okList.includes(item.value),
          'view': viewCard(item.id),
        }"
        @click="clickCard(item)"
      >
        {{ viewCard(item) ? item.value : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  const num = ref<number>(2)
  const isLock = ref<boolean>(false)
  const canView = ref<boolean>(true)
  const cardList = ref<any[]>([])
  const okList = ref<string[]>([])
  const curCard = ref<any[]>([])
  const bestTotal = ref(0)
  const total = ref(0)

  const column = ref<number>(0)
  const rows = ref<number>(0)

  const viewCard = (item: any) => curCard.value.find(c => c.id === item.id)

  const loadData = () => {
    cardList.value = []
    for(let i = 0 ; i< column.value*rows.value ;i ++) {
      const randomIndex = Math.floor(Math.random() * (column.value*rows.value + 1));
      cardList.value.splice(randomIndex, 0, {
        id: i,
        value: `${Math.floor(i/2)}`,
      })
    }
  }
  // 设置行列
  const setCardConfig = () => {
    column.value = num.value
    rows.value = num.value%2 === 0 ? num.value : num.value + 1
  }
  // 重置
  const resetCard = () => {
    setCardConfig()
    total.value = 0
    okList.value = []
    loadData()
  }
  const clickCard = (item: any) => {
    if (!canView.value) return
    total.value += 1
    // 暂存
    curCard.value.push(item)
    // 不到配对数量，直接返回
    if (curCard.value.length < 2) {
      return
    }
    // 判断条件
    if (curCard.value.length === 2) {
      // 符合配对
      // if () {
        // 添加到已配对数组
        // isOk = true
      // } else {
        // 不符合配对
        // 清空状态

      // }
      // 延时执行
      
    }
    canView.value = false
    setTimeout(() => {
      if (curCard.value.length === 2 && curCard.value[0].value === item.value) {
        okList.value.push(item.value)
      }
      curCard.value = []
      canView.value = true
      // 全部完成
      if (okList.value.length === column.value*rows.value/2) {
        setTimeout(() => {
          if (!isLock.value) {
            num.value += 1
            bestTotal.value = 0
          }
          if (!bestTotal.value || total.value < bestTotal.value) {
            bestTotal.value = total.value
          }
          resetCard()
        }, 500)
      }
    }, 500)
  }

  // 变更难度
  const changeNum = () => {
    bestTotal.value = 0
    resetCard()
  }
  onMounted(() => {
    resetCard()
  })
</script>

<style scoped>
  .warp{
    width: 100%;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  .card-list{
    display: grid;
    max-width: 500px;
    max-height: 500px;
    gap: 10px;
  }
  .card {
    cursor: pointer;
    min-width: 50px;
    /* max-width: 50px; */
    height: 50px;
    background: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    &.card-ok{
      visibility: hidden;
    }
  }
</style>