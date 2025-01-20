<template>
  <span class="tag">
    <slot>
      {{ content || '标签' }}
    </slot>
  </span>
</template>
<script lang="ts" setup>
  withDefaults(defineProps<{
    type?: string
    content?: string
  }>(), {
    
  })
</script>
<style scoped>
.tag{
  background: #eee;
  padding: 2px 5px;
  border-radius: 4px;
}
</style>