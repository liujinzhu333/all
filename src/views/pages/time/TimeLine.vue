<template>
  <div class="vertical-timeline">
    <canvas ref="canvasEl"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';

const props = defineProps({
  nodes: {
    type: Array,
    required: true,
    validator: nodes => nodes.every(n => 'time' in n && 'label' in n && 'image' in n)
  },
  nodeDuration: {
    type: Number,
    default: 1000 // 每个节点的动画时长
  },
  lineColor: {
    type: String,
    default: '#409EFF'
  }
});

// 响应式变量
const canvasEl = ref(null);
const ctx = ref(null);
const animationFrame = ref(null);
const startTime = ref(null);
const loadedImages = ref(new Map());
const nodeProgress = ref([]);
const activeNodeIndex = ref(-1);

// 初始化进度数组
const initProgress = () => {
  nodeProgress.value = props.nodes.map(() => ({
    progress: 0,
    start: null,
    loaded: false
  }));
};

// 初始化画布
const initCanvas = () => {
  const canvas = canvasEl.value;
  if (!canvas) return;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  ctx.value = canvas.getContext('2d');
  ctx.value.scale(dpr, dpr);
};

// 预加载图片
const loadImagesSequentially = async () => {
  for (const [index, node] of props.nodes.entries()) {
    await new Promise((resolve) => {
      if (!loadedImages.value.has(node.image)) {
        const img = new Image();
        img.src = node.image;
        img.onload = () => {
          loadedImages.value.set(node.image, img);
          resolve();
        };
        img.onerror = resolve;
      } else {
        resolve();
      }
    });
  }
};

// 节点动画逻辑
const updateNodeProgress = (timestamp) => {
  if (!startTime.value) startTime.value = timestamp;
  
  props.nodes.forEach((_, index) => {
    if (index > activeNodeIndex.value) return;

    const nodeState = nodeProgress.value[index];
    
    // 启动第一个节点
    if (index === 0 && !nodeState.start) {
      nodeState.start = timestamp;
    }
    
    // 启动后续节点
    if (index > 0 && nodeProgress.value[index-1].progress >= 1 && !nodeState.start) {
      nodeState.start = timestamp;
      activeNodeIndex.value = index;
    }

    if (nodeState.start) {
      const elapsed = timestamp - nodeState.start;
      nodeState.progress = Math.min(elapsed / props.nodeDuration, 1);
    }
  });

  draw();
  
  if (activeNodeIndex.value < props.nodes.length - 1 || 
      nodeProgress.value[activeNodeIndex.value].progress < 1) {
    animationFrame.value = requestAnimationFrame(updateNodeProgress);
  }
};

// 绘制逻辑
const draw = () => {
  if (!ctx.value || !canvasEl.value) return;
  
  const canvas = canvasEl.value;
  const { width, height } = canvas.getBoundingClientRect();
  const centerX = width / 2;
  const totalHeight = height;
  const nodeSpacing = totalHeight / (props.nodes.length + 1);

  ctx.value.clearRect(0, 0, width, height);
  
  // 绘制时间轴基线
  ctx.value.beginPath();
  ctx.value.moveTo(centerX, 0);
  ctx.value.lineTo(centerX, totalHeight);
  ctx.value.strokeStyle = props.lineColor + '40';
  ctx.value.lineWidth = 4;
  ctx.value.stroke();

  // 绘制激活的时间轴
  const activeHeight = nodeSpacing * (activeNodeIndex.value + 1);
  ctx.value.beginPath();
  ctx.value.moveTo(centerX, 0);
  ctx.value.lineTo(centerX, activeHeight);
  ctx.value.strokeStyle = props.lineColor;
  ctx.value.stroke();

  // 绘制节点
  props.nodes.forEach((node, index) => {
    const progress = nodeProgress.value[index]?.progress || 0;
    const yPos = nodeSpacing * (index + 1);
    const currentY = yPos * Math.min(progress * 1.2, 1);

    // 绘制连接线
    if (progress > 0) {
      ctx.value.beginPath();
      ctx.value.moveTo(centerX, currentY);
      ctx.value.lineTo(centerX + 80 * Math.min(progress * 1.5, 1), currentY);
      ctx.value.strokeStyle = props.lineColor + Math.min(progress * 2, 1).toString(16);
      ctx.value.stroke();
    }

    // 绘制圆形节点
    if (progress > 0) {
      ctx.value.beginPath();
      ctx.value.arc(centerX, currentY, 6 * progress, 0, Math.PI * 2);
      ctx.value.fillStyle = props.lineColor + Math.min(progress * 2, 1).toString(16);
      ctx.value.fill();
    }

    // 绘制图片
    const img = loadedImages.value.get(node.image);
    if (img && progress > 0) {
      ctx.value.globalAlpha = Math.min(progress * 2, 1);
      ctx.value.drawImage(
        img,
        centerX + 100 - (1 - progress) * 50,
        currentY - 25,
        50,
        50
      );
      ctx.value.globalAlpha = 1;
    }

    // 绘制文字
    if (progress > 0) {
      ctx.value.fillStyle = `rgba(0, 0, 0, ${Math.min(progress * 2, 1)})`;
      ctx.value.font = '14px Arial';
      ctx.value.textAlign = 'left';
      ctx.value.fillText(
        node.label,
        centerX + 160 - (1 - progress) * 50,
        currentY + 5
      );
    }
  });
};

// 生命周期
onMounted(async () => {
  initCanvas();
  initProgress();
  await loadImagesSequentially();
  activeNodeIndex.value = 0;
  animationFrame.value = requestAnimationFrame(updateNodeProgress);
  window.addEventListener('resize', initCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', initCanvas);
  cancelAnimationFrame(animationFrame.value);
});
</script>

<style scoped>
.vertical-timeline {
  width: 100%;
  height: 800px;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>