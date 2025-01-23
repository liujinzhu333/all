<template>
  <div class="tree">
    <div>
      <div></div>
      <TreeItem
       v-for="item in list"
       :item="item"
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
      </TreeItem>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSlots } from 'vue'
import type { TreeItemI } from './interface'
import TreeItem from './TreeItem.vue'

const props = withDefaults(defineProps<{
  list: TreeItemI[]
}>(), {

})
const slots = useSlots()
</script>