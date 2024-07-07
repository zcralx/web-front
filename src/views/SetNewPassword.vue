<template>
  <div class="background-image">
    <div class="login-container">
      <h3>修改密码</h3>
      <div class="all-set">
        <div class="old-input">
          <el-input placeholder="用户名" v-model="usernameSet" />
          <el-input type="password" placeholder="旧密码" v-model="passwordSet" show-password/>
        </div>
        <div class="new-set">
          <el-input type="password" placeholder="新密码" v-model="newPasswordSet" show-password/>
          <el-input type="password" placeholder="确认新密码" v-model="newPassword" show-password/>
        </div>
      </div>
      <div class="login-footer">
        <div><el-button style="background-color: pink" @click="PasswordSet">修改密码</el-button></div>
        <div><el-button style="background-color: #2be2a2" @click="router.push('/')">返回登录</el-button></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.all-set {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.old-input {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.old-input > * {
  width: 80%;
  margin: auto;
}
.new-set {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.new-set > * {
  width: 80%;
  margin: auto;
}
@media (max-width: 800px) {
  .all-set {
    flex-direction: column;
  }
  .new-set {
    margin-top: 10%;
  }
}
</style>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from "axios";
import router from "@/router";
const usernameSet = ref('')
const passwordSet = ref('')
const newPasswordSet = ref('')
const newPassword = ref('')
const PasswordSet = () => {
  if (usernameSet.value === '' || passwordSet.value === '' || newPasswordSet.value === '' || newPassword.value === '') {
    ElMessage.error('请输入完整信息!')
    return
  }
  if (newPasswordSet.value === newPassword.value) {
    axios.post('http://localhost:8001/user/setPassword', {
      username: usernameSet.value,
      password: passwordSet.value,
      newPassword: newPasswordSet.value
    }).then(res => {
      if (res.data.code === 1) {
        ElMessage.success('修改成功')
      } else {
        ElMessage.error('修改失败，请检查用户名或密码!')
      }
    })
  } else {
    ElMessage.error('两次密码不一致!')
  }
}
</script>
