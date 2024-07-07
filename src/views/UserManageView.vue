<template>
  <el-container class="userlist-container">
    <el-aside><CommonAside /></el-aside>
    <el-container>
      <el-header><CommonHeader /></el-header>
      <el-main><UserListTable /></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import { computed } from 'vue'
import store from '@/store'
import UserListTable from "@/components/UserListTable.vue"
const pcolor = computed(() => store.state.pColor)
const bgColor = computed(() => store.state.bgColor)
</script>
<style scoped>
.userlist-container {
  height: 100vh;
}
.el-aside {
  width: 15%;
}
.el-header {
  text-align: right;
  font-size: 12px;
  position: relative;
  background-color: v-bind('bgColor');
}
.el-main {
  background-color: v-bind('pcolor');
}
@media (max-width: 1000px) {
  .el-aside {
    width: 0%;
  }
}
</style>
