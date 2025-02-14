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
    <Card
      :title="`签到（${observe?.weather}）`"
      class="news-card"
    >
        <Calender />
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios';
import { Card, Tag, Tree, Button, Calender } from '@/components/Base'
import { planList as planListData } from '@/data/plan'
import type { PlanItem } from '@/data/plan'

const planList = ref<PlanItem[]>([])

function getPlan() {
  planList.value = planListData
}
getPlan()

function addClick() {
  console.log(3333)
}
const observe = ref()

async function getWeather(){
  const res = await axios.get('/api/weather/common?source=pc&weather_type=observe&province=四川&city=成都&county=成华区')
  observe.value = res.data.data.observe
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