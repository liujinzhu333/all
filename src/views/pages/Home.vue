<template>
  <div class="home-page">
    <Card
      style="flex: 1;"
      title="我的工作台"
      class="bench-card"
    >
      <div style="margin-bottom: 15px;">
        <Button @click="addClick">待办</Button>
      </div>
      <div >
        <Tree
          :list="planList"
        >
          <template #title="{ treeNode }">
            {{ treeNode.title }}
            <Tag v-if="treeNode.status">{{ treeNode.status }}</Tag>
          </template>
        </Tree>
      </div>
    </Card>
    <div>
      <Card
        :title="`签到（${observe?.weather}）`"
        class="news-card"
      >
          <Calender />
      </Card>
      <Card
        title="英语"
        class="news-card"
      >
      </Card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Card, Tag, Tree, Button, Calender } from '@/components/Base'
import { planList as planListData } from '@/data/plan'
import type { PlanItem } from '@/data/plan'

import { getWeatherData } from '@/services/HomeServices.ts'

const planList = ref<PlanItem[]>([])

function getPlan() {
  planList.value = planListData
}
console.log(Card)
getPlan()

function addClick() {
  console.log(3333)
}
const observe = ref()

async function getWeather(){
  observe.value = await getWeatherData()
}
getWeather()

</script>
<style scoped>
.home-page{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .bench-card{
    min-width: 300px;
  }
  .news-card{
    width: 200px;
    height: fit-content;
  }
}
</style>