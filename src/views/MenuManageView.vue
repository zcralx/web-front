<template>
  <el-container class="layout-container-demo">
    <el-aside width="15%"><CommonAside /></el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px;"><CommonHeader/></el-header>
      <el-main><WelcomeRui /></el-main>
    </el-container>
  </el-container>
</template>
<style scoped>
.layout-container-demo {
  height: 100vh;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: v-bind('bgColor');
  box-shadow: var(--el-box-shadow-light);
}
.layout-container-demo .el-main {
  background-color: v-bind('pcloor');
  padding: 0;
  box-shadow: var(--el-box-shadow-light);
}
@media (max-width: 1000px) {
  .el-aside {
    width: 0%;
  }
}
</style>
<script setup>
import CommonAside from '@/components/CommonAside.vue'
import { computed } from 'vue'
import store from '@/store'
import CommonHeader from "@/components/CommonHeader.vue";
import WelcomeRui from "@/components/WelcomeRui.vue";
const bgColor = computed(() => store.state.bgColor)
const pcloor = computed(() => store.state.pColor)
</script>
