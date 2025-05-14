<template>
  <div class="setting-box">
    <el-button @click="deploy">
      一键部署
    </el-button>
  </div>
</template>

<script lang="ts" setup>
  import configServices from '@/services/ConfigServices'

  const deploy = async () => {
    await configServices.deploy()
  }

</script>
<style lang="css" scoped>
.setting-box{
  position: fixed;
  top: 20vh;
  right: 0;
  width: 200px;
  height: 200px;
  z-index: 10;
  background-color: #fff;
  box-shadow: var(--el-box-shadow-light);
}
</style>