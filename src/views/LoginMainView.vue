<template>
  <div class="background-image">
    <div class="login-container">
      <h3>登录</h3>
      <div class="all-login">
        <div class="quick-login">
          <el-button type="primary" @click="QQlogin">QQ登陆</el-button>
          <el-button style="margin: auto;" type="success" @click="WXlogin">微信登陆</el-button>
          <el-button style="margin: auto" @click="alipaylogin">支付宝登陆</el-button>
        </div>
        <div class="normal-login">
          <el-input style="width: 80%" type="text" v-model="login_username" placeholder="用户名"></el-input>
          <el-input style="width: 80%" type="password" v-model="login_password" placeholder="密码" show-password></el-input>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
      <div class="login-footer">
        <router-link to='/register' style="color: white;">注册用户</router-link>
        <router-link to='/set' style="color: white;">修改密码</router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.all-login {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.quick-login {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.quick-login > * {
  width: 80%;
  margin: auto;
}
.normal-login {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.normal-login > * {
  width: 80%;
  margin: auto;
}
@media (max-width: 650px) {
  .all-login {
    flex-direction: column;
  }
  .normal-login {
    margin-top: 10%;
  }
}
</style>
<script setup>
import {ElMessage} from "element-plus";
import {ref} from "vue";
import axios from "axios";
import router from "@/router";
const QQlogin = () => {
  ElMessage.warning("QQ登录暂未开放!")
}
const WXlogin = () => {
  ElMessage.warning("微信登录暂未开放!")
}
const alipaylogin = () => {
  ElMessage.warning("支付宝登录暂未开放!")
}
const login_username = ref("")
const login_password = ref("")
const formatDateString = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}
const login = async () => {
  if (login_username.value === "" || login_password.value === "") {
    ElMessage.error("用户名或密码为空!")
    return
  }
  try {
    axios.post('http://localhost:8001/user/login',{
      username: login_username.value,
      password: login_password.value
    }).then(response => {
      if (response.data.code === 1) {
        ElMessage.success("登录成功!")
        localStorage.setItem('UserName', response.data.data.name)
        localStorage.setItem('UserEmail', response.data.data.email)
        localStorage.setItem('UserMoney', response.data.data.money)
        localStorage.setItem('UserBirthday', formatDateString(response.data.data.birthday))
        localStorage.setItem('UserAvatar', response.data.data.avatar)
        router.push({
          path: '/menu',
          query: {
            UserName: response.data.data.name,
            Email: response.data.data.email,
            Money: response.data.data.money,
            Birthday: formatDateString(response.data.data.birthday),
            UserAvatar: response.data.data.avatar
          }
        })
      } else {
        ElMessage.error("登录失败!")
      }
    })
  } catch (error) {
    ElMessage.error("登录失败，请检查网络连接或后端服务!");
  }
}
</script>
