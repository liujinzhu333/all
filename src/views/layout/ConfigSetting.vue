<template>
  <div
    class="setting-box"
    :class="{'show': showView}"
  >
    <div
      class="setting"
      @click="toggleShow"
    >
      <el-icon><Setting /></el-icon>
    </div>
    <div
      v-if="showView"
      class="action"
    >
      <div>
        <ElSwitch
          size="small"
          :model-value="config.isDev" @change="handleChangeDev"
        />
      </div>
      <el-input
        v-model="message"
        placeholder="提交记录"
      />
      <ElCheckbox v-model="isTypeCheck" />
      <el-button
        :disabled="deployLoading||!message"
        size="mini"
        @click="deploy"
      >
        一键部署
      </el-button>
      <el-steps
        style="height: 150px;"
        direction="vertical"
        process-status="finish"
        finish-status="success"
        :active="activeStep"
      >
        <el-step title="文档同步" />
        <el-step title="数据同步" />
        <el-step title="部署提交" />
      </el-steps>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { Setting } from '@element-plus/icons-vue'
  import configServices from '@/services/ConfigServices'
  import manageService from '@/services/manageService'
  import docsServices from '@/services/docsServices'
  import { ElCheckbox, ElSwitch } from 'element-plus'

  import { useConfigStore } from '@/stores/config'

  const config = useConfigStore()

  const handleChangeDev = () => {
    config.toggleDev()
  }

  const showView = ref(false)
  const toggleShow = () => {
    showView.value = !showView.value
  }
  const message = ref('')
  const isTypeCheck = ref<boolean>(false)
  const deployLoading = ref(false)

  const activeStep = ref(-1)
  const addStep = () => {
    activeStep.value += 1
  }
  const deploy = async () => {
    if (deployLoading.value) return
    try {
      deployLoading.value = true
      activeStep.value = 0
      await docsServices.getDocsMenu()
      addStep()
      await manageService.getAllDataJson()
      addStep()
      await configServices.deploy(message.value, isTypeCheck.value)
      addStep()
    } finally {
      deployLoading.value = false
    }
  }

</script>
<style lang="css" scoped>
.setting-box{
  position: fixed;
  top: 20vh;
  right: 0;
  width: 20px;
  height: 20px;
  z-index: 10;
  background-color: #fff;
  box-shadow: var(--el-box-shadow-light);
  &.show {
    width: 130px;
    height: auto;
  }
  .setting{
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .action {
    padding: 10px;
  }
}
</style>