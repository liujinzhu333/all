<template>
  <div class="home-page">
    <Card
      style="flex: 1;"
    >
      我的工作台
      待办
      <div >
        <ul>
          <li v-for="item in planList">
            <div>{{ item.name }}</div>
            <ul v-if="item.children">
              <li v-for="itemI in item.children">
                <div>{{ itemI.name }}</div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Card>
    <Card
      style="width: 200px;"
    >
        每日资讯
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Card } from '@/components/Base'

const planList = ref<any[]>([])

function getPlan() {
  planList.value = [
    {
      name: '首页-工作台',
      type: '技术',
      status: '未开始',
      children: [
        {
          name: '卡片组件Card',
          status: '未开始',
        },
        {
          name: '标签组件Tag',
          status: '未开始',
        },
        {
          name: '标签组件Tag',
          status: '未开始',
        },
        {
          name: '树形控件Tree',
          status: '未开始',
        },
      ]
    },
    {
      name: '首页-每日资讯',
      type: '技术',
      status: '未开始',
    }
  ]
}
getPlan()

</script>
<style scoped>
.home-page{
  width: 100%;
  display: flex;
  gap: 20px;
}
</style>