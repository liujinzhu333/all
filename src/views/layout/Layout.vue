<template>
  <div class="main">
    <Header />
    <div class="body">
      <RouterView />
    </div>
  </div>

</template>
<script lang="ts" setup>
  import { RouterView } from 'vue-router'
  import Header from './Header.vue';
</script>
<style scoped>
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