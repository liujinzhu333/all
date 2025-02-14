<template>
  <div>
    <h1>工具</h1>
    <div>
      自己将来封装的方法，建立的插件等等，好用的网站，有用的链接等等
    </div>
    <div v-for="item in utilList">
      <a :href="item.link"
      target="_black"
      >
        <img
          style="width: 30px;height: 30px;"
          :src="item.logo"
        />
        {{item.title}}
      </a>
    </div>
    https://www.figma.com/design/RlMHg4IV2YgRqVn4ZrVc2T/Untitled?node-id=0-1&p=f&t=WmDX0hFnjiWTckYr-0
  </div>
</template>
<script lang="ts" setup>

  const utilList = [
    {
      title: 'Vite.js',
      logo: 'https://cn.vitejs.dev/logo.svg',
      link: 'https://cn.vitejs.dev/',
    }
  ]
</script>