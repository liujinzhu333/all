<template>
  <div class="docs-page">
    <div class="docs-page-nav">

    </div>
    <div class="docs-page-content">
      <h1>主站</h1>
      <div>
        分为首页、组件库、项目、工具、文档、记录五个页面
      </div>
      <h2>首页</h2>
      <div>
        首页包含工作台、资讯两大块，左右布局，区分技术和生活。
        <ul>
          <li>
            工作台包含计划项，按技术和生活区分。<br/>
            技术计划项包含需要学习、整理、开发的技术项。<br/>
            生活计划项包含将来的旅游计划、节日、纪念日提醒等。
          </li>
          <li>
            资讯展示需要了解的信息，按技术和生活区分。<br/>
            技术项展示各种前沿技术动态，前期放上链接手动查看。<br/>
            生活项待定...
          </li>
        </ul>
      </div>
      <h2>组件库</h2>
      <div>
        组件库就是封装的各种组件的展示和模块。按功能区分，卡片展示。
      </div>
      <h2>项目</h2>
      <div>
        个人作品集展示，以卡片列表列出来。
      </div>
      <h2>工具</h2>
      <div>
        分为两大类：我的工具和其他
        <ul>
          <li>我的工具指个人开发、封装的方法、工具</li>
          <li>其他包含一些好用的工具网站，学习网站等。</li>
        </ul>
      </div>
      <h2>文档</h2>
      <div>
        文档作为开发或计划确定过程，记录想法和文件说明。
        确定网站开发方向和设计的想法。具体待设计
      </div>
      <h2>记录</h2>
      <div>
        记录包含网站变更日志、生活记录、技术记录等。具体形式待设计
      </div>
    </div>
  </div>
</template>
<style scoped>
.docs-page{
  width: 100%;
  display: flex;
  gap: 20px;
  .docs-page-nav {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
  }
  .docs-page-content{
    flex: 1;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
  }
}
</style>