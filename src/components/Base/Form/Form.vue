<template>
  <form
    ref="el"
    class="form"
    @submit="handleSubmit"
  >
    <slot />
  </form>
</template>
<script setup lang="ts">

  const handleSubmit = () => {

  }
</script>
<style lang="css" scoped>
.form{
  display: flex;
}
</style>