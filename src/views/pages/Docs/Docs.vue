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
        @node-click="handleNodeClick"
      />
    </div>
    <div class="docs-page-content">
      <h1>{{ currentDocs?.title }}</h1>
      <DocsViewer
        v-if="currentDocs?.docsPath"
        :docs-path="currentDocs.docsPath"
      />
      <!-- <div>
        分为首页、项目、文档、工具、记录、管理六个页面
      </div>
      <h2>首页</h2>
      <div>
        首页包含工作台、资讯两大块，左右布局，区分技术和生活。
        <ul>
          <li>
            工作台包含计划项，按技术和生活区分。<br/>
            技术计划项包含需要学习、整理、开发的技术项。<br/>
            生活计划项包含将来的旅游计划、节日、纪念日提醒等。
          </li>
          <li>
            资讯展示需要了解的信息，按技术和生活区分。<br/>
            技术项展示各种前沿技术动态，前期放上链接手动查看。<br/>
            生活项待定...
          </li>
        </ul>
      </div>
      <h2>项目</h2>
      <div>
        个人作品集展示，以卡片列表列出来。
      </div>
      <h2>文档</h2>
      <div>
        文档作为开发或计划确定过程，记录想法和文件说明。
        确定网站开发方向和设计的想法。具体待设计
      </div>
      <h2>工具</h2>
      <div>
        分为两大类：我的工具和其他
        <ul>
          <li>我的工具指个人开发、封装的方法、工具</li>
          <li>其他包含一些好用的工具网站，学习网站等。</li>
        </ul>
      </div>
      <h2>记录</h2>
      <div>
        记录包含网站变更日志、生活记录、技术记录等。具体形式待设计
      </div>
      <h2>管理</h2>
      <div>
        数据库管理
      </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import docsService from '@/services/docsServices'

  import DocsViewer from './DocsViewer.vue'

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
  // const docsData: DocsItem[] = [
  //   {
  //     title: '说明',
  //     docs: '',
  //     children: [
  //       {
  //         title: '首页',
  //         docs: ''
  //       },
  //       {
  //         title: '项目',
  //         docs: ''
  //       },
  //       {
  //         title: '文档',
  //         docs: ''
  //       },
  //       {
  //         title: '工具',
  //         docs: ''
  //       },
  //       {
  //         title: '记录',
  //         docs: ''
  //       },
  //       {
  //         title: '管理',
  //         docs: ''
  //       },
  //     ],
  //   }
  // ]

  const treeRef = ref()
  const filterText = ref('')
  const docsMenu = ref<DocsItem[]>([])
  const currentDocs = ref<DocsItem>()

  const filterNode = (value: string, data: DocsItem) => {
    if (!value) return true
    return data.title.includes(value)
  }

  const handleNodeClick = (data: DocsItem) => {
    currentDocs.value = data
  }
  const getDocsMenu = async () => {
    try {
      const list = await docsService.getDocsMenu()
      docsMenu.value = list
      currentDocs.value = docsMenu.value?.[0] || {}
    } catch (err) {
      console.error('获取docs目录:', err)
    }
  }
  getDocsMenu()
  watch(filterText, (val) => {
    treeRef.value!.filter(val)
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
</style>