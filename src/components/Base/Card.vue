<template>
  <div class="card">
    <slot>
      Card
    </slot>
  </div>
</template>
<style scoped>
.card{
  width: 100%;
  padding: 8px 12px;
  border-radius: 7px;
  background-color: var(--color-white);
  box-shadow: 0 1px 5px var(--color-shadow);
}
</style>