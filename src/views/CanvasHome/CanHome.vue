<template>
  <div class="can-box">
    <div>
      <button @click="toggle">切换</button>
      <button @click="rend">启动</button>
    </div>
    <div id="scene-container" :style="sceneStyle">
    </div>
  </div>
</template>
<script setup>
  import { onMounted, computed, ref } from 'vue'
  import { World } from './World/World'

  let world = ''

  const isMax = ref(false)

  const sceneStyle = computed(() => isMax.value ? ({
    width: '100vw',
    height: '80vh',
  }) : ({
    width: '100px',
    height: '100px',
  }))
  function main() {
    // Get a reference to the container element
    const container = document.querySelector('#scene-container');

    // 1. Create an instance of the World app
    world = new World(container);

    // 2. Render the scene
    
  }
  function rend() {
    // world.render();
    world.start();
  }

  function toggle() {
    isMax.value = !isMax.value
  }

  onMounted(() => {
    main()
  })

</script>
<style lang="css">
.can-box{
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>