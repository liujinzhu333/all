<template>
  <div class="markdown-viewer">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else v-html="htmlContent"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, nextTick, watch } from 'vue'
  import { marked } from 'marked'
  // import Prism from 'prismjs'
  import DOMPurify from 'dompurify'

  const props = withDefaults(defineProps<{
    docsPath: string
  }>(), {
    docsPath: ''  // 如: '/docs/guide.md'
  })

  const htmlContent = ref('')
  const loading = ref(true)
  const error = ref<string>()

  // 高亮配置
  // marked.setOptions({
  //   highlight: (code: string, lang: string) => {
  //     const validLang = Prism.languages[lang] ? lang : 'markup'
  //     return Prism.highlight(code, Prism.languages[validLang], validLang)
  //   }
  // } as any)
  const init = async () => {
    try {
      // 1. 加载原始文本
      // 关键：使用 Vite 环境变量处理基础路径
      const basePath = import.meta.env.BASE_URL
      if (!props.docsPath) return
      const fullPath = `${basePath}${props.docsPath.replace(/^\//, '')}`
      const response = await fetch(fullPath)
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`)
      
      const rawText = await response.text()
      // *** 过滤 Frontmatter 纯正则方案
      const contentText = rawText.replace(/^---\s*[\s\S]*?\s*---(\s*)/, '')
      // 2. 转换并净化
      const unsafeHtml = marked.parse(contentText)
      htmlContent.value = DOMPurify.sanitize(unsafeHtml as any)

      // 3. 手动触发代码高亮
      // await nextTick()
      // Prism.highlightAll()
    } catch (err: any) {
      error.value = `文档加载失败: ${err.message}`
    } finally {
      loading.value = false
    }
  }

  onMounted(async () => {
    init()
  })
  watch(() => props.docsPath, () => {
    init()
  })
</script>

<style>

.markdown-viewer {
  width: 100%;
  margin: 0 auto;
}

.markdown-viewer pre[class*="language-"] {
  border-radius: 8px;
  padding: 5px;
  margin: 10px 0;
}

.error {
  color: #dc3545;
  padding: 3px;
  border: 1px solid currentColor;
  border-radius: 4px;
}
</style>
<style lang="css">
pre {
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  code {
    padding: 0;
    margin: 0;
  }
}
code {
  height: 16px;
  padding: 2px 5px;
  font-size: 12px;
  background-color: #f0f0f0;
  border-radius: 2px;
  margin: 0 2px;
}
</style>