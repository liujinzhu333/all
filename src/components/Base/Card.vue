<template>
  <div class="card">
    <div
      v-if="title"
      class="card-header">
      {{ title }}
    </div>
    <div class="card-content">
      <slot>
        Card
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string

}>(), {

})
</script>
<style scoped>
.card{
  width: 100%;
  border-radius: 7px;
  background-color: var(--color-white);
  box-shadow: 0 1px 5px var(--color-shadow);
  .card-header{
    padding: 8px 12px;
    font-weight: 500;
    border-bottom: 0.5px solid var(--color-border);
  }
  .card-content{
    padding: 8px 12px;
  }
}
</style>