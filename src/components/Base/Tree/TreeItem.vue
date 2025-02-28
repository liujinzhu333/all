<template>
  <div
    class="tree-item"
    @click="handleClick"
  >
    <div class="tree-item-content">
      <div
        :style="{
          width: `${(props.level * 15)}px`
        }"
      ></div>
      <div
        v-if="item?.children"
        class="tree-item-expand"
        :class="{
          'tree-item-expand-open': expand,
        }"
        @click="toggleExpand"
      >
        <svg
          width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.82809 0.720081L5.3161 4.6227C5.54532 4.82202 5.54532 5.17799 5.3161 5.37731L0.82809 9.27992C0.504476 9.56133 0 9.33147 0 8.90262V1.09738C0 0.668532 0.504476 0.438677 0.82809 0.720081Z" fill="black" fill-opacity="0.45"></path></svg>
      </div>
      <div
        v-else
        class="tree-item-expand"
      />
      <slot
        v-if="slots.title"
        name="title"
        :treeNode="item"
      />
      <div
        v-else
        class="tree-item-title"
      >
        <span>{{ item.title}}</span>
        <slot
          name="action"
          :treeNode="item"
        />
      </div>
    </div>
    <div
      v-show="expand"
      class="tree-item-children"
    >
      <TreeItem
        v-for="itemI in item?.children"
        :item="itemI"
        :level="props.level + 1"
        @selectItem="selectItem"
      >
        <template
          v-if="slots.title"
          #title="{ treeNode }"
        >
          <slot
            name="title"
            :treeNode="treeNode"
          />
        </template>

        <template
          v-if="slots.action"
          #action="{ treeNode }"
        >
          <slot
            name="action"
            :treeNode="treeNode"
          />
        </template>
      </TreeItem>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {
    ref, useSlots,
  } from 'vue'
  import type { TreeItemI } from './interface'
  const emits = defineEmits(['selectItem'])
  const props = withDefaults(defineProps<{
    item: TreeItemI
    level?: number
  }>(), {
    level: 0,
  })

  const slots = useSlots()

  const expand = ref<boolean>(false)
  const toggleExpand = () => {
    if (!props.item?.children) return
    expand.value = !expand.value
  }
  const handleClick = () => {
    if (!props.item?.children) {
      emits('selectItem', props.item)
    }
  }
  const selectItem = (data: TreeItemI) => {
    emits('selectItem', data)
  }
</script>
<style scoped>
.tree-item-content{
  display: flex;
  align-items: center;
  cursor: pointer; 
  padding: 5px 10px 5px 0;
  border-radius: 5px;
  gap: 5px;
  &:hover{
    background-color: #f3f3f3;
  }
}
.tree-item-expand{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
  &.tree-item-expand-open{
    transform: rotateZ(90deg);
  }
}
.tree-item-title {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.tree-item-children{
  /* padding-left: 15px; */
}
</style>