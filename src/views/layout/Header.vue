<template>
  <header>
    <nav>
      <RouterLink
        v-for="item in menuList"
        :key="item.value"
        :to="item.path"
      >
        {{ item.name }}
      </RouterLink>
    </nav>
  </header>
</template>
<script lang="ts" setup>
  const menuList = [
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
    {
      name: '组件库',
      value: 'components',
      path: 'components',
    },
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
    }
  ]
</script>
<style scoped>
header{
  width: 100%;
  height: 64px;
  padding: 4px 20px;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  nav {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>