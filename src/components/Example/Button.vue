<template>
  <Button type="primary" size="large">主要按钮</Button>
  <Button type="success" shape="round">成功按钮</Button>
  <Button type="danger" :loading="true">加载中</Button>
  <Button disabled>禁用按钮</Button>
</template>
<script lang="ts" setup>
  import { Button } from '@/components/Base'
</script>