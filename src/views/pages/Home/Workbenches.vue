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
          <!-- <span style="display: inline-block;"> -->
            <el-dropdown 
              v-if="data.status"
              placement="bottom-start"
              @command="selectStatus"
            >
              <el-tag
                size="small"
                :type="statusMap[data.status].type"
                style="margin: 0 5px;"
              >
                {{ statusMap[data.status].text }}
              </el-tag>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, key) in statusMap"
                    :command="({...data, status: key})"
                  >
                    <el-tag
                      size="small"
                      :type="item.type"
                    >
                      {{ item.text }}
                    </el-tag>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          <!-- </span> -->
          <el-button
            :icon="Edit"
            size="small"
            text
            circle
            @click.stop="addPlan"
          />
          <el-button
            :icon="Plus"
            size="small"
            text
            circle
            @click.stop="addPlan"
          />
        </div>
      </template>
    </el-tree>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import manageService from '@/services/manageService'
  import { Edit, Plus } from '@element-plus/icons-vue'
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
  const selectStatus = (item: any) => {
    console.log(333, item)
  }
  const addPlan = () => {

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