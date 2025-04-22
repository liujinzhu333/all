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
      :props="defaultProps"
      @node-click="handleNodeClick"
    >
      <template #default="{ node, data }">
        <div class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-tag
              v-if="data.status"
              size="small"
              :type="statusMap[data.status].type"
              style="margin: 0 5px;"
            >
              {{ statusMap[data.status].text }}
            </el-tag>
          </span>
        </div>
      </template>
    </el-tree>
  </el-card>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import manageService from '@/services/manageService'

  const statusMap:any = {
    1: {
      type: 'info',
      text: '待开始',
    },
    2: {
      type: 'primary',
      text: '进行中',
    },
    3: {
      type: 'success',
      text: '已完成',
    },
  }

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

  const defaultProps = {
    children: 'children',
    label: 'title',
  }

  const planList = ref<any>()
  // const showPlanList = computed(() => planList)


  function buildTree(items: any, pid: string|number|null = null) {
    const tree = [];
    
    for (const item of items) {
      if (item.pid === pid) {
        const children = buildTree(items, item.id);
        if (children.length > 0) {
          item.children = children;
        }
        if (children.length > 0 ||  filter.value.status === item.status || filter.value.status === '0') {
          tree.push(item)
        }
      }
    }
    
    return tree;
  }
  const getData = async () => {
    const res = await manageService.getDataList('plan')
    planList.value = buildTree(res.filter(item => item.type !== '预留项'))
  }

  const handleChange = () => {
    getData()
  }

  const handleNodeClick = (item: any) => {
    console.log(item)
  }
  getData()
</script>