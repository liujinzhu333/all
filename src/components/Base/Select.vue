<template>
  <select @input="change">
    <option
      v-for="item in options"
      :key="item"
    >{{item}}</option>
  </select>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{
  options: any[]
}>(), {

})
const emits = defineEmits(['change'])
const change = (e) => {
  const selectOption = props.options[e.target.selectedIndex]
  emits('change', selectOption)
}
</script>
<style scoped>
</style>