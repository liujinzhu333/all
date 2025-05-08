<template>
  <div class="header">
    <nav>
      <RouterLink
        v-for="item in menuList"
        :key="item.value"
        :to="item.path"
      >
        {{ item.name }}
      </RouterLink>
    </nav>
    <RouterLink
      v-if="canOperate"
      to="self"
    >
      我
    </RouterLink>
  </div>
</template>
<script lang="ts" setup>
  import  { computed } from 'vue'
  import { canOperate } from '@/config'
  const menuList = computed(() => [
    {
      name: '首页',
      value: 'home',
      path: 'home',
    },
    // {
    //   name: 'About',
    //   value: 'About',
    //   path: 'about',
    // },
    // {
    //   name: '组件库',
    //   value: 'components',
    //   path: 'components',
    // },
    {
      name: '项目',
      value: 'projects',
      path: 'projects',
    },
    {
      name: '文档',
      value: 'docs',
      path: 'docs',
    },
    {
      name: '工具',
      value: 'utils',
      path: 'utils',
    },
    {
      name: '记录',
      value: 'changeLog',
      path: 'change-log',
    },
    {
      name: '管理',
      value: 'manage',
      path: 'manage',
      show: canOperate,
    }
  ].filter(item => item.show === undefined || item.show)) 
</script>
<style scoped>
.header{
  width: 100%;
  height: 60px;
  background-color: var(--color-white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>