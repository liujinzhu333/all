<template>
  <h2>国考</h2>
  <el-timeline style="max-width: 600px">
    <el-timeline-item placement="top" timestamp="2025-10">
      <ul>
        <li>
          10月中旬公告发布
        </li>
        <li>
          公告发布后1-2天报名
        </li>
        <li>
          <el-link href="http://www.scs.gov.cn" target="_blank">
            国家公务员局官网：http://www.scs.gov.cn（公告、职位表、成绩查询）
          </el-link>
        </li>
      </ul>
    </el-timeline-item>
  </el-timeline>

</template>
<script setup>
  const timeList = [
    {
      time: '2025-10',
      content: '公告发布，报名，国家公务员局官网：http://www.scs.gov.cn（公告、职位表、成绩查询）。'
    },
    {
      time: '2025-11',
    },
    {
      time: '2025-11',
    }
  ]
</script>