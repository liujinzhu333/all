<template>
  <div>
    <div class="user-img">

    </div>
    <el-timeline style="max-width: 600px">
      <el-timeline-item
        v-for="(activity, index) in timelineData"
        :key="index"
        :timestamp="activity.timestamp"
        placement="top"
      >
        {{ activity.content.join('、') }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script lang="ts" setup>
  import { timelineData } from './const'
</script>