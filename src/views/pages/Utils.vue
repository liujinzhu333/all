<template>
  <div>
    <!-- <h1>工具</h1> -->
    <div
      v-for="item in utilList"
      class="util-type-item"
    >
      <h4 class="item-title">
        {{item[0].type}}
        <el-button
          v-if="canOperate"
          :icon="Plus"
          size="small"
          text
          circle
          @click.stop="addUtil(item[0].type)"
        />
      </h4>
      <el-space wrap :size="[12, 5]">
        <el-space
          v-for="(util, index) in item"
          :size="0"
        >
          <el-link :href="util.link" target="_blank">
            <img v-if="util.logo" style="width: 20px; height: 20px;margin-right: 5px;" :src="util.logo" />
            {{util.name}}
          </el-link>
          <el-button
            v-if="canOperate"
            :icon="Edit"
            size="small"
            text
            circle
            @click.stop="editData(util)"
          />
        </el-space>
      </el-space>
    </div>

    <EditModal
      v-model:visible="visible"
      table="utils"
      :data="dataInfo"
      @confirm="getDataList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Edit, Link, Plus } from '@element-plus/icons-vue'
  import { canOperate } from '@/config/index'
  import EditModal from '@/components/EditModal.vue'
  import manageService from '@/services/manageService'

  const utilList = ref<any>([])
  const visible = ref<boolean>(false)
  const dataInfo = ref<any>({})
  const utilsTypeList = computed(() => {

  })
  const getDataList = async () => {
    const data = await manageService.getDataList('utils') || []
    utilList.value = data?.reduce((acc: any, item:any) => {
      const type = item.type; // 获取当前对象的 type 属性
      if (!acc[type]) {
        acc[type] = []; // 如果该类型尚未分组，则初始化一个空数组
      }
      acc[type].push(item); // 将当前对象添加到对应类型的数组中
      return acc;
    }, {});
  }
  const addUtil = (type: string) => {
    dataInfo.value = {
      type,
    }
    visible.value = true
  }

  const editData = (util: any) => {
    dataInfo.value = { ...util }
    visible.value = true
  }
  getDataList()
</script>
<style lang="css" scoped>
.util-type-item {
  margin-bottom: 10px;
  .item-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
