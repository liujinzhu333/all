<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import Header from './Header.vue';
</script>
<style scoped>
.common-layout{
  .el-header {
    border-bottom: 1px solid #e4e7ed;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
    z-index: 1;
  }
  .el-main {
    background-color: #fafafa;
  }
}
.main{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .body{
    margin: 0 auto;
    flex: 1;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
  }
}
</style>