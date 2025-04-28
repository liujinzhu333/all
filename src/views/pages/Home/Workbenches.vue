<template>
  <el-card
    header="我的工作台"
    style="width: 100%;min-height: 300px;"
  >
    <div style="margin-bottom: 12px;">
      <el-segmented
        v-model="filter.status"
        :options="options"
        @change="handleChange"
      />
    </div>
    <el-tree
      style="width: 100%;"
      :data="planList"
      :props="{
        children: 'children',
        label: 'title',
      }"
      node-key="id"
      :default-expanded-keys="defaultExpandedKeys"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <el-text>{{ node.label }}</el-text>
          <el-tag
            v-if="data.status"
            size="small"
            :type="statusMap[data.status].type"
            style="margin: 0 5px;"
          >
            {{ statusMap[data.status].text }}
          </el-tag>
          <template v-if="canOperate">
            <el-button
              :icon="Edit"
              size="small"
              text
              circle
              @click.stop="editPlan(data)"
            />
            <el-button
              :icon="Plus"
              size="small"
              text
              circle
              @click.stop="addPlan(data)"
            />
          </template>
        </div>
      </template>
    </el-tree>
  </el-card>
  <EditModal
    v-model:visible="visible"
    table="plan"
    :data="dataInfo"
    @confirm="getData"
  />
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { Edit, Plus } from '@element-plus/icons-vue'
  import manageService from '@/services/manageService'
  import EditModal from '@/components/EditModal.vue'
  import { canOperate } from '@/config/index'
  import { statusMap, buildTree } from './const'

  const options = ref([{
    label: '全部',
    value: '0',
  }])

  for(let key in statusMap){
    options.value.push({
      label: statusMap[key].text,
      value: key,
    })
  }

  const filter = ref({
    status: '0',
  })

  const planList = ref<any>()
  const defaultExpandedKeys = [1,2,3,4,5,6,7,8,9,10]
  const visible = ref<boolean>(false)
  const dataInfo = ref<any>({})
  let resData:any = []
  
  const getData = async () => {
    const res = await manageService.getDataList('plan')
    resData = res||[]
    planList.value = buildTree(res.filter((item: any) => item.type !== '预留项'))
  }

  const handleChange = () => {
    planList.value = buildTree(resData.filter((item: any) => item.type !== '预留项'), null, filter.value.status)
  }

  const handleNodeClick = (item: any) => {
    console.log(item)
  }

  const editPlan = (data: any) => {
    dataInfo.value = {
      ...data,
    }
    visible.value = true
  }
  const addPlan = (data: any) => {
    dataInfo.value = {
      type: data.type,
      pid: data.id,
    }
    visible.value = true
  }
  getData()
</script>
<style lang="css" scoped>
.custom-tree-node{
  line-height: 24px;
  display: flex;
  align-items: center;
}
.el-button+.el-button {
  margin: 0;
}
</style>