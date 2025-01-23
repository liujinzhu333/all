<template>
  <button class="button">按钮</button>
</template>
<script lang="ts" setup>
</script>
<style>
.button{
  cursor: pointer;
  padding: 5px 12px;
  border-radius: 5px;
  border: 0.5px solid #eee;
  background-color: #f5f5f5;
  &:hover{
    background-color: #f0f0f0;
  }
  &:active{
    background-color: #e0e0e0;
  }
}
</style>