<template>
  <div class="home-page">
    <Card
      style="flex: 1;"
      title="我的工作台"
      class="bench-card"
    >
      <!-- <div style="margin-bottom: 15px;">
        <Button>待办</Button>
      </div> -->
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
      title="每日资讯"
      class="news-card"
    >
        
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Card, Tag, Tree, Button } from '@/components/Base'
import { planList as planListData } from '@/data/plan'
import type { PlanItem } from '@/data/plan'

const planList = ref<PlanItem[]>([])

function getPlan() {
  planList.value = planListData
}
getPlan()

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