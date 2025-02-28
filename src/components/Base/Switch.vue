<template>
  <div class="switch">
    <label
      class="switch-label"
      :class="{
        'checked': modelValue,
      }"
    >
      <input
        :checked="modelValue"
        type="checkbox"
        @change="handleChange"
      />
      <span class="switch-indicator"></span>
    </label>
  </div>
</template>
<script lang="ts" setup>

  const emits = defineEmits(['update: modelValue', 'change'])
  const props = withDefaults(defineProps<{
    modelValue: boolean
  }>(), {
    modelValue: true
  })
  const handleChange = (e) => {
    emits('update: modelValue', e.target.checked)
    emits('change', e.target.checked)
  }

</script>
<style scoped>
.switch{
  display: inline-flex;
  .switch-label {
    cursor: pointer;
    display: inline-flex;
    width: 40px;
    height: 24px;
    border-radius: 12px;
    padding: 3px;
    background-color: #eee;
    align-items: center;
    transition: background-color 0.2s;
    &.checked{
      background-color: #33aaff;
      &>input{
        width: calc(100% - 19px);
      }
    }
    &>input{
      width: 0;
      height: 0;
      opacity: 0;
      margin: 0;
      transition: width 0.2s;
    }
    .switch-indicator {
      display: inline-block;
      width: 19px;
      height: 19px;
      border-radius: 10px;
      background-color: #fff;
    }
  }
}
</style>