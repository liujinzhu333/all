<template>
  <div class="docs-page">
    <div class="docs-page-nav">
      <el-input
        v-model="filterText"
        placeholder="查找"
      />
      <el-tree
        ref="treeRef"
        :data="docsMenu"
        :props="defaultProps"
        :filter-node-method="filterNode"
        style="margin-top: 10px;"
        @node-click="handleNodeClick"
      />
    </div>
    <div class="docs-page-content">
      <h1>{{ currentDocs?.title }}</h1>
      <DocsViewer
        v-if="currentDocs?.docsPath"
        :docs-path="currentDocs.docsPath"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import docsService from '@/services/docsServices'

  import DocsViewer from './DocsViewer.vue'

  const router = useRouter()
  const route = useRoute()

  interface DocsItem {
    title: string
    docs: string
    docsPath: string
    children?: DocsItem[]
    [key: string]: any
  }
  const defaultProps = {
    children: 'children',
    label: 'title',
  }

  const treeRef = ref()
  const filterText = ref('')
  const docsMenu = ref<DocsItem[]>([])
  const currentDocs = ref<DocsItem>()

  const filterNode = (value: string, data: DocsItem) => {
    if (!value) return true
    return data.title.includes(value)
  }

  const handleNodeClick = (data: DocsItem) => {
    router.push({ query: { docs: data.title}})
    currentDocs.value = data
  }
  const getDocsMenu = async () => {
    try {
      const list = await docsService.getDocsMenu()
      docsMenu.value = list
      if (route.query.docs) {
        // currentDocs.value
      }
      currentDocs.value = docsMenu.value?.[0] || {}
    } catch (err) {
      console.error('获取docs目录:', err)
    }
  }
  watch(filterText, (val) => {
    treeRef.value!.filter(val)
  })
  onMounted(() => {
    getDocsMenu()
  })
</script>
<style scoped>
.docs-page{
  width: 100%;
  display: flex;
  gap: 20px;
  .docs-page-nav {
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    width: 150px;
  }
  .docs-page-content{
    flex: 1;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
  }
}
h1 {
  margin-bottom: 10px;
  font-weight: 500;
}
h3 {
  font-weight: 500;
}
</style>