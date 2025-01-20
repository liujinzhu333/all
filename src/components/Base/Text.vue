<template>
  <span
    class="text"
    :class="[`text-${size}`]"
  >
    <slot></slot>
  </span>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
  type: string
  size?: 'small'|'default'|'large'
}>(), {
  type: '',
  size: 'default',
})
</script>
<style scoped>
.text{
  font-size: 14px;
  &.text-small {
    font-size: 12px;
  }
  &.text-large {
    font-size: 16px;
  }
}
</style>