<template>
  <div class="form-item">
    <div class="form-item-label">

    </div>
    <div class="form-item-content">

    </div>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(defineProps<{

  }>(), {

  })
</script>
<style lang="css" scoped>
.form-item{
  width: 100%;
  display: flex;
  .form-item-label {
    width: 100px;
  }
  .form-item-content {
    min-width: 200px;
    width: calc(100% - 100px);
  }
}
</style>