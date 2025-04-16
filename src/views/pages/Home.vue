<template>
  <div class="home-page">
    <Card
      style="flex: 1;"
      title="我的工作台"
      class="bench-card"
    >
      <div style="margin-bottom: 15px;">
        <Button @click="addClick">待办</Button>
        <!-- <img src="https://ci.xiaohongshu.com/1040g2sg31el3dj335k7g49rk0prdm959ff09pco?imageView2/2/w/540/format/jpg/q/75"/> -->
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
      <el-card>
        <el-calendar>
          <template #date-cell="{ data }">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(2).join('-') }}
              {{ data.isSelected ? '✔️' : '' }}
            </p>
            <div class="lunar">{{ getLunarDisplay(data.date) }}</div>
          </template>
        </el-calendar>
      </el-card>
      <!-- <Card
        :title="`签到（${observe?.weather}）`"
        class="news-card"
      >
          <Calender />
      </Card>
      <Card
        title="英语"
        class="news-card"
      >
      </Card> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { Card, Tag, Tree, Button, Calender } from '@/components/Base'
  import { planList as planListData } from '@/data/plan'
  import type { PlanItem } from '@/data/plan'
  // @ts-ignore
  import { Solar, Lunar } from 'lunar-javascript'
  import manageService from '@/services/manageService';

  const dayList = ref([])
  const getDays = async () => {
    const data = await manageService.getDataList('important_day') || []
    dayList.value = data
  }
  getDays()

  const getLunarDisplay = (jsDate: any) => {

      const lunar = Lunar.fromDate(jsDate);

      const dayStr = lunar.getDayInChinese();
      const mm = lunar.getMonth()
      const dd = lunar.getDay()
      // console.log(mm)
      // console.log(lunar.getDay())
      // console.log(dayList.value)

      if (dayList.value) {
        const a: any = dayList.value.filter((item: any) => {
          const dayList = item?.day?.split('-')
          // console.log([0])
          return dayList[1] == mm && dayList[2] == dd
        }) || []
        if (a.length) {
          return a[0].title
        }
      }
    
      // 高亮节日
      const festivals = lunar.getFestivals();

      if (festivals.length > 0) {
        return festivals[0]
        return `<span style="color: #f56c6c">${festivals[0]}</span>`;
      }

      // 显示节气
      const jieQi = lunar.getJieQi();
      if (jieQi) {
        return jieQi
        return `<span style="color: #67c23a">${jieQi}</span>`;
      }

      return dayStr;
  }

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