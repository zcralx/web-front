<template>
  <div class="toolbar">
    <el-dropdown>
              <span class="el-dropdown-link">
                <el-icon><UserFilled /></el-icon>{{ name }}
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goToMenuView">首页</el-dropdown-item>
          <el-dropdown-item divided @click="goToUserManage">用户管理</el-dropdown-item>
          <el-dropdown-item>文章管理</el-dropdown-item>
          <el-dropdown-item divided @click="ExitToLogin">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style scoped>
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
<script setup>
import { ArrowDown, UserFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {onMounted, ref} from "vue";
const name = ref('')
const router = useRouter()
const ExitToLogin = () => {
  ElMessage({
    message: '退出成功',
    type: 'success'
  })
  router.push('/')
}
const goToMenuView = () => {
  router.push({
    path: '/menu',
    query: {
      UserName: localStorage.getItem('UserName'),
      Email: localStorage.getItem('UserEmail'),
      Money: localStorage.getItem('UserMoney'),
      Birthday: localStorage.getItem('UserBirthday'),
      UserAvatar: localStorage.getItem('UserAvatar')
    }
  })
}
const goToUserManage = () => {
  router.push({
    path: '/userlist'
  })
}
onMounted(() => {
  name.value = localStorage.getItem('UserName')
})
</script>
