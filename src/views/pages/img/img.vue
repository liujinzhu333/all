<template>
  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue'
  import { Plus } from '@element-plus/icons-vue'
  import { canOperate } from '@/config'
  import type { UploadProps, UploadUserFile, UploadRawFile } from 'element-plus'
  import manageService from '@/services/manageService'
  import fileService from '@/services/FileServices'

  const beforeUpload = async (rawFile: UploadRawFile) => {
    await fileService.upload({
      file: rawFile,
      name: '12'
    })

    return false
  }

  const fileList = ref<UploadUserFile[]>([])

  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  // @ts-ignore
  const albumPath = computed(() => canOperate ? `@fs${__PROJECT_ROOT__}/../album/` : 'https://liujinzhu333.github.io/album/' )

  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }

  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  const getList = async () => {
    const res = await manageService.getDataList('files')
    fileList.value = res.map((item: any) => ({
      name: item.originalname,
      url: `${albumPath.value}${item.path}`,
    }))
  }
  getList()
</script>
