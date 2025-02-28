<template>
  <div class="tree">
    <div>
      <div></div>
      <TreeItem
       v-for="item in list"
       :item="item"
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
  import { useSlots } from 'vue'
  import type { TreeItemI } from './interface'
  import TreeItem from './TreeItem.vue'

  const emits = defineEmits(['selectItem'])
  const props = withDefaults(defineProps<{
    list: TreeItemI[]
  }>(), {

  })
  const slots = useSlots()

  const selectItem = (data: TreeItemI) => {
    emits('selectItem', data)
  }
</script>