import { ElMessage } from 'element-plus'
// 复制文本
export async function copyText(text: string) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      ElMessage({
        message: '复制成功',
        type: 'success',
      })
    } else {
      // 降级方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      ElMessage({
        message: '复制成功',
        type: 'success',
      })
    }
  } catch (err) {
    ElMessage({
      message: '复制失败, 请重试',
      type: 'error',
    })
    console.error('复制失败:', err);
  }
}
