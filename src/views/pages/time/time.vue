<template>
  <div class="container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 轮播配置
const SLIDES = [
  {
    image: 'images/1.jpg',
    text: 'FIRST SHOW',
    textColor: '#FF3366'
  },
  {
    image: 'images/2.png',
    text: 'SECOND SLIDE',
    textColor: '#33CCFF'
  },
  {
    image: 'images/3.png',
    text: 'THIRD IMAGE',
    textColor: '#99FF33'
  }
]

const CONFIG = {
  particleGap: 5,         // 图片粒子密度
  textGap: 3,             // 文字粒子密度  
  particleSize: 2,        // 粒子大小
  animationSpeed: 0.1,   // 聚合速度
  switchInterval: 4000,   // 切换间隔
  displayHeight: 500      // 图片显示高度
}

const canvasRef = ref(null)
const particles = ref([])
const animationFrameId = ref(null)
const currentIndex = ref(0)
const loadedSlides = ref([])

class Particle {
  constructor(targetX, targetY, color) {
    // 初始位置随机分布在屏幕外
    this.x = Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25
    this.y = Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25
    this.targetX = targetX
    this.targetY = targetY
    this.color = color
    this.size = CONFIG.particleSize
    this.speed = CONFIG.animationSpeed
    this.alpha = 0 // 初始透明
  }

  update() {
    // 渐显效果
    this.alpha = Math.min(1, this.alpha + 0.02)
    
    // 向目标位置移动
    const dx = this.targetX - this.x
    const dy = this.targetY - this.y
    this.x += dx * this.speed
    this.y += dy * this.speed
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// 初始化画布
const initCanvas = () => {
  const canvas = canvasRef.value
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

// 加载所有资源
const preloadResources = async () => {
  loadedSlides.value = await Promise.all(SLIDES.map(async slide => {
    const img = await loadImage(slide.image)
    return { ...slide, image: img }
  }))
}

const loadImage = (path) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = path
  })
}

// 生成粒子系统
const createParticles = (slide) => {
  const newParticles = []
  
  // 生成图片粒子
  const imgParticles = createImageParticles(slide.image)
  // 生成文字粒子
  const textParticles = createTextParticles(slide.text, slide.textColor, slide.image.height)
  
  return [...imgParticles, ...textParticles]
}

// 创建图片粒子
const createImageParticles = (img) => {
  const particles = []
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 计算显示尺寸
  const scale = CONFIG.displayHeight / img.height
  const displayWidth = img.width * scale
  canvas.width = displayWidth
  canvas.height = CONFIG.displayHeight
  ctx.drawImage(img, 0, 0, displayWidth, CONFIG.displayHeight)
  
  // 获取像素数据
  const imageData = ctx.getImageData(0, 0, displayWidth, CONFIG.displayHeight)
  
  // 生成粒子
  for (let y = 0; y < imageData.height; y += CONFIG.particleGap) {
    for (let x = 0; x < imageData.width; x += CONFIG.particleGap) {
      const index = (y * imageData.width + x) * 4
      const [r, g, b, a] = imageData.data.slice(index, index + 4)
      if (a > 50) {
        const targetX = x + (window.innerWidth - displayWidth) / 2
        const targetY = y + (window.innerHeight - CONFIG.displayHeight) / 2
        particles.push(new Particle(targetX, targetY, `rgba(${r},${g},${b},${a/255})`))
      }
    }
  }
  return particles
}

// 创建文字粒子
const createTextParticles = (text, color, imgHeight) => {
  const particles = []
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 设置文字样式
  ctx.font = `bold 48px Arial`
  const textWidth = ctx.measureText(text).width
  
  // 计算位置
  const startX = (window.innerWidth - textWidth) / 2
  const startY = (window.innerHeight + imgHeight) / 2 + 50
  
  // 绘制文字
  canvas.width = textWidth
  canvas.height = 60
  ctx.font = `bold 48px Arial`
  ctx.fillStyle = color
  ctx.fillText(text, 0, 48)
  
  // 获取文字像素数据
  const textData = ctx.getImageData(0, 0, textWidth, 60)
  
  // 生成粒子
  for (let y = 0; y < textData.height; y += CONFIG.textGap) {
    for (let x = 0; x < textData.width; x += CONFIG.textGap) {
      const index = (y * textData.width + x) * 4
      const a = textData.data[index + 3]
      if (a > 50) {
        particles.push(new Particle(
          startX + x,
          startY + y - 30, // 垂直居中
          color
        ))
      }
    }
  }
  return particles
}

// 切换下一内容
const switchContent = () => {
  currentIndex.value = (currentIndex.value + 1) % SLIDES.length
  particles.value = createParticles(loadedSlides.value[currentIndex.value])
}

// 动画循环
const animate = () => {
  const ctx = canvasRef.value.getContext('2d')
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  
  particles.value.forEach(particle => {
    particle.update()
    particle.draw(ctx)
  })
  
  animationFrameId.value = requestAnimationFrame(animate)
}

// 自动轮播
let autoPlayTimer = null
const startAutoPlay = () => {
  autoPlayTimer = setInterval(switchContent, CONFIG.switchInterval)
}

onMounted(async () => {
  initCanvas()
  window.addEventListener('resize', initCanvas)
  
  await preloadResources()
  particles.value = createParticles(loadedSlides.value[0])
  animate()
  startAutoPlay()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', initCanvas)
  cancelAnimationFrame(animationFrameId.value)
  clearInterval(autoPlayTimer)
})
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #1a1a1a;
  overflow: hidden;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}
</style>