<template>
  <div class="change-log-page">
    <!-- <h1>记录</h1>
    <div>
      变更记录，生活记录等
    </div> -->
    <!-- <el-affix :offset="50" target="body"> -->
      <div class="filter-box">
        <el-segmented v-model="curType" :options="typeList" size="small" @change="changeType"/>
        <el-checkbox-group v-model="curTag" size="small">
          <el-checkbox-button
            v-for="tag in tagList"
            :key="tag"
            :value="tag"
          >
            {{ tag }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    <!-- </el-affix> -->
    <el-timeline style="width: 100%;margin-top: 20px;">
      <el-timeline-item
        v-if="canOperate"
      >
        <el-button
            @click="addLog"
          >添加</el-button>
      </el-timeline-item>
      <el-timeline-item
        v-for="(log, index) in showDataList"
        :key="index"
        :timestamp="log.dateTime"
      >
        <div>
          {{ log.title }}
          <el-tag size="small">{{ log.tags }}</el-tag>
          <el-button
            v-if="canOperate"
            :icon="Edit"
            size="small"
            text
            circle
            @click.stop="editLog(log)"
          />
        </div>
        <el-text size="small">
          {{ log.content }}
        </el-text>
      </el-timeline-item>
    </el-timeline>
    <EditModal
      v-model:visible="visible"
      table="changelog"
      :data="dataInfo"
      @confirm="getDataList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Edit, Link, Setting } from '@element-plus/icons-vue'
  import { canOperate } from '@/config/index'
  import EditModal from '@/components/EditModal.vue'
  import manageService from '@/services/manageService'

  const dataList = ref<any[]>([
    {
      time: '2025.1.24',
      content: '首页调整，卡片Card支持封面',
    },
    {
      time: '2025.1.23',
      content: '首页工作台，依赖组件',
    },
    {
      time: '2025.1.20',
      content: '架构基本确定，页面区分',
    },
    {
      time: '2025.1.18',
      content: '架构整理, Timeline组件',
    },
    {
      time: '2025.1.17',
      content: '初始化项目，部署构建到github pages',
    }
  ])
  const curType = ref('技术')
  const curTag = ref<string[]>([])
  const typeList = ref<string[]>(['技术', '生活'])
  const tagList = ref<string[]>([])
  const visible = ref<boolean>(false)
  const dataInfo = ref()
  const showDataList = computed(() => dataList.value.filter(item => (item.type === curType.value || !curType.value) && (curTag.value.includes(item.tags) || !curTag.value.length)))
  // const typeList = computed(())

  const changeType = () => {
    curTag.value = []
    tagList.value = [...new Set(showDataList.value.map(item => item.tags))]
  }
  const getDataList = async () => {
    const res =  await manageService.getDataList('changelog')
    dataList.value = [...res].sort((a, b) => b.dateTime?.localeCompare(a.dateTime));
    // typeList.value = [...new Set(dataList.value.map(item => item.type))]
    changeType()
  }
  const addLog = () => {
    dataInfo.value = {
      type: curType.value,
      tags: curTag.value?.[0],
    }
    visible.value = true
  }
  const editLog = (item: any) => {
    dataInfo.value = {...item}
    visible.value = true
  }
  getDataList()

</script>
<style scoped>
.change-log-page{
  margin: 0 auto;
  width: 1000px;
}
.filter-box{
  display: flex;
  gap: 10px;
  padding: 10px;
  position: sticky;
  top: -20px;
  z-index: 2;
  background-color: #fff;
}
</style>