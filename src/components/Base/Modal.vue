<template>
  <div v-if="showModal" class="mask">
    <div class="modal">
      <div class="modal-header">
        {{ title }}
        <Button @click="handleClose">
          X
        </Button>
      </div>
      <div class="modal-content">
        <slot />
      </div>
      <div class="modal-footer">
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import Button from './Button.vue'

  const emits = defineEmits(['close', 'update:show'])
  const props = withDefaults(defineProps<{
    show: boolean
    title: string
  }>(), {

  })
  const showModal = ref<boolean>(false)
  watch(() => props.show, () => {
    showModal.value = !!props.show
  })
  const handleClose = () => {
    // if (props.show)
    emits('close')
    emits('update:show', false)
  }
</script>
<style scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  margin: 10px;
  min-width: 300px;
  min-height: 200px;
  background-color: #fff;
  border-radius: 5px;
}
.modal-header {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  justify-content: space-between;
}
.modal-content {
  min-height: 150px;
  overflow: auto;
}
.modal-footer {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  align-items: center;
  justify-content: flex-end;
}
</style>