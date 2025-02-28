<!-- Button.vue -->
<template>
  <button
    class="v-button"
    :class="[
      `v-button--${type}`,
      `v-button--${size}`,
      `v-button--${shape}`,
      {
        'is-disabled': disabled || loading,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-label="loading ? 'Loading' : undefined"
    @click="handleClick"
  >
    <span v-if="loading" class="v-button__loading">
      <slot name="loading">
        <span class="v-button__loading-dot" />
      </slot>
    </span>
    <span class="v-button__content">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  shape?: 'default' | 'round' | 'circle'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  shape: 'default'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
/* 基础样式 */
.v-button {
  display: inline-flex;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* 主类型样式（关键修改） */
.v-button.v-button--primary {
  background-color: var(--color-primary-500);
  color: white;
}

/* 状态处理 */
.v-button.v-button--primary:hover:not(.is-disabled) {
  background-color: var(--color-primary-400);
}

.v-button.v-button--primary:active:not(.is-disabled) {
  background-color: var(--color-primary-600);
}

/* 禁用状态 */
.v-button.v-button--primary.is-disabled {
  background-color: var(--color-primary-200);
  opacity: 0.6;
  cursor: not-allowed;
}
</style>