<template>
  <div>
    <h1>工具</h1>
    <div v-for="item in utilList">
      <h4>{{item[0].type}}</h4>
      <el-space wrap :size="12">
        <el-link  v-for="(util, index) in item" :href="util.link" target="_blank">
          <img v-if="util.logo" style="width: 20px; height: 20px;margin-right: 5px;" :src="util.logo" />
          {{util.name}}
        </el-link>
      </el-space>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import manageService from '@/services/manageService';

  const utilList = ref<any>([])
  const utilsTypeList = computed(() => {

  })
  const getList = async () => {
    const data = await manageService.getDataList('utils') || []
    utilList.value = data.reduce((acc, item) => {
      const type = item.type; // 获取当前对象的 type 属性
      if (!acc[type]) {
        acc[type] = []; // 如果该类型尚未分组，则初始化一个空数组
      }
      acc[type].push(item); // 将当前对象添加到对应类型的数组中
      return acc;
    }, {});
  }
  getList()
</script>