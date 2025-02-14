<template>
  <div class="card">
    <div
      v-if="title || slots.title"
      class="card-header">
      <slot
        name="title"
      >
        {{ title }}
      </slot>
    </div>
    <div
      v-if="coverImage || coverText"
      class="card-cover"
    >
      <slot name="cover">
        <img
          v-if="coverImage"
          :src="coverImage"
        />
        <span
          v-else-if="coverText"
        >
          {{ coverText}}
        </span>
      </slot>
    </div>
    <div class="card-content">
      <slot>
        Card
      </slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue'
withDefaults(defineProps<{
  title?: string
  coverImage?: string // 封面图
  coverText?: string // 封面替代文本
}>(), {

})
const slots = useSlots()
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
  .card-cover{
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    min-height: 50px;
    background-color: var(--color-background);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #00aaff;
    font-family: cursive;
    span{
      font-weight: 600;
    }
  }
  .card-content{
    padding: 8px 12px;
  }
}
</style>