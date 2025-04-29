<template>
  <div>
    <div>
      <el-space
        wrap
        :fill-ratio="25"
      >
        <el-card  v-for="item in dataList" :span="6" style="min-width: 200px;">
          <el-space>
            <el-text>
              {{item.name}}
            </el-text>
            <el-tag v-if="item.status === 1" type="primary">进行中</el-tag>
            <el-tag v-else-if="item.status === 2" type="success">已完成</el-tag>
            <el-tag v-else-if="item.status === 0" type="info">待开始</el-tag>
            <el-tag v-else-if="item.status === 3" type="warning">暂停</el-tag>
            <el-tag v-else-if="item.status === 4" type="danger">废弃</el-tag>
            
          </el-space>
          <template #footer>
            <el-space>
              <el-link v-if="item.url" :href="item.url" target="_blank">
                <el-icon><Link /></el-icon>
              </el-link>
              <el-link v-if="item.github" :href="item.github" target="_blank">
                <img
                  style="width: 14px;"
                  src="https://github.githubassets.com/favicons/favicon.svg" alt="github"
                />
              </el-link>

              <el-link v-if="item.manage" :href="item.manage" target="_blank">
                <el-icon><Setting /></el-icon>
              </el-link>
              <el-button
                v-if="canOperate"
                :icon="Edit"
                size="small"
                text
                circle
                @click.stop="editProject(item)"
              />
            </el-space>
          </template>
        </el-card>
        <div
          v-if="canOperate"
          class="add-project"
          @click="addProject"
        >
          添加
        </div>
      </el-space>
    </div>

    <EditModal
      v-model:visible="visible"
      table="project"
      :data="dataInfo"
      @confirm="getList"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Edit, Link, Setting } from '@element-plus/icons-vue'
  import { canOperate } from '@/config/index'
  import manageService from '@/services/manageService'
  import EditModal from '@/components/EditModal.vue'

  const dataList = ref<any>([])
  const visible = ref<boolean>(false)
  const dataInfo = ref()
  const getList = async () => {
    const data = await manageService.getDataList('project') || []
    dataList.value = data
  }
  const addProject = () => {
    dataInfo.value = {}
    visible.value = true
  }
  const editProject = (item: any) => {
    dataInfo.value = { ...item }
    visible.value = true
  }
  getList()
  let data = [
    {
      title: '单页简历',
      viewLink: '',
      gitHub: '',
    },
    {
      title: '个人网站',
      viewLink: '',
      gitHub: '',
    },
    {
      title: '微信小程序',
      viewLink: '',
      gitHub: '',
    },
    {
      title: 'vscode插件',
      viewLink: '',
      gitHub: '',
    },
    
  ]

</script>

<style>
.add-project {
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #fff;
}
</style>