<template>
  <div class="timeline">
    <div
      v-for="item in list"
      class="timeline-item"
    >
      <div class="timeline-item-line"></div>
      <div class="timeline-item-dot"></div>
      <div class="timeline-item-time">
        {{item.time}}
      </div>
      <div class="timeline-item-content">
        <slot>
          {{item.content}}
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

const props = withDefaults(defineProps<{
  list: any[]
}>(), {
  list: () =>([])
})
</script>
<style scoped>
.timeline{
  display: flex;
  flex-direction: column;
  .timeline-item{
    position: relative;
    min-height: 30px;
    padding: 0 0 20px 120px;
    border-radius: 5px;
    &:hover{
      background-color: rgba(200,200,200,0.3);
      .timeline-item-dot, .timeline-item-line{
        background-color: #0af;
      }
    }
    .timeline-item-time {
      position: absolute;
      top: 0;
      left: 120px;
      padding: 5px;
      max-width: 120px;
      transform: translateX(calc(-100% - 10px));
      font-size: 14px;
      color: #777;
    }
    .timeline-item-dot {
      position: absolute;
      top: 16px;
      left: 120px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: translate3d(-50%, -50%, 0);
      background-color: #ccc;
    }

    .timeline-item-line {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 120px;
      width: 2px;
      transform: translate3d(-50%, 0, 0);
      background-color: #ccc;
    }
    .timeline-item-content {
      padding: 5px 5px 5px 15px;
    }
  }
}
</style>