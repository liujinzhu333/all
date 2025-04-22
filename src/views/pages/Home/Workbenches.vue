<template>
  <el-card
    header="我的工作台"
    style="min-width: 600px;"
  >
    <el-tree
      style="max-width: 600px"
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
  import { ref } from 'vue'
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
  function buildTree(items: any, pid: string|number|null = null) {
    const tree = [];
    
    for (const item of items) {
      if (item.pid === pid) {
        const children = buildTree(items, item.id);
        if (children.length > 0) {
          item.children = children;
        }
        tree.push(item);
      }
    }
    
    return tree;
  }

  const defaultProps = {
    children: 'children',
    label: 'title',
  }

  const planList = ref<any>()

  const getData = async () => {
    const res = await manageService.getDataList('plan')
    planList.value = buildTree(res.filter(item => item.type !== '预留项'))
  }
  getData()
</script>