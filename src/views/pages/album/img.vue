<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :before-upload="beforeUpload"
  >
    <template #file="{ file, index }">
      <div class="custom-card">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="canOperate"
            class="el-upload-list__item-delete"
            @click="handleEdit(file)"
          >
            <el-icon><Edit /></el-icon>
          </span>
          <span
            v-if="canOperate"
            class="el-upload-list__item-delete"
            @click="handleRemove(file, index)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <div class="view-box">
      <img class="view-img" w-full :src="dialogImageUrl" alt="Preview Image" />
    </div>
  </el-dialog>

  <EditModal
    v-model:visible="editVisible"
    table="files"
    :data="editInfo"
    @confirm="getList"
  />
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Plus, Delete, ZoomIn, Edit } from '@element-plus/icons-vue'
  import { canOperate } from '@/config'
  import type { UploadProps, UploadUserFile, UploadRawFile, UploadFile, UploadFiles } from 'element-plus'
  import manageService from '@/services/manageService'
  import fileService from '@/services/FileServices'
  import EditModal from '@/components/EditModal.vue'

  const fileList = ref<UploadUserFile[]>([])

  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const isUpload = ref(false)

  const editVisible = ref(false)
  const editInfo = ref()
  // @ts-ignore
  const albumPath = computed(() => canOperate ? `@fs${__PROJECT_ROOT__}/../album/` : 'https://liujinzhu333.github.io/album/' )

  const dataFormat = (item: any) => ({
    name: item.originalname,
    filename: item.filename,
    url: `${albumPath.value}${item.path}`,
    id: item.id,
    raw: item,
  })

  const getList = async () => {
    const res = await manageService.getDataList('files')
    fileList.value = res.map((item: any) => (dataFormat(item)))
  }
  // 上传
  const beforeUpload = async (rawFile: UploadRawFile) => {
    isUpload.value = true
    const res = await fileService.upload({
      file: rawFile,
    })
    fileList.value.push((dataFormat(res.data)))
    return false
  }
  const handleEdit = (item: any) => {
    editInfo.value = { ...item.raw }
    editVisible.value = true
  }
  // 删除
  const handleRemove = async (uploadFile: any, index: number) => {
    if (isUpload.value) {
      isUpload.value = false
      return false
    }
    try {
      await fileService.delFile({
        id: uploadFile.id,
        name: uploadFile.name,
        filename: uploadFile.filename,
      })
      fileList.value.splice(index, 1)
    } catch (err) {
      console.log(uploadFile)
      return false
    }
  }

  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  getList()
</script>
<style scoped>
.custom-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.view-box {
  display: flex;
  align-items: center;
  justify-content: center;
  .view-img {
    max-width: 100%;
    max-height: 70vh;
  }
}
</style>
