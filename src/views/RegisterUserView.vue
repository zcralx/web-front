<template>
  <div class="background-image">
    <div class="login-container">
      <h3>注册新用户</h3>
      <div class="register-upload">
        <div class="register-main">
          <el-input style="width: 80%" type="text" v-model="userinfoname" placeholder="用户名"></el-input>
          <el-input style="width: 80%" type="password" v-model="userinfopassword" placeholder="密码" show-password></el-input>
          <el-input style="width: 80%" type="text" v-model="userinfoemail" placeholder="邮箱"></el-input>
          <el-date-picker style="width: 80%" v-model="userinfodate" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div class="img-upload">
          <p>请上传头像</p>
          <el-form-item style="margin: auto">
            <el-upload
                class="avatar-uploader"
                :action="uploader"
                :before-upload="beforeAvatarUpload"
                :show-file-list="false"
                list-type="picture"
            >
              <el-image v-if="imageUrl" v-model="imageUrl" :src="imageUrl" style="width: 200px; height: 100%;"/>
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </div>
      </div>
      <div class="login-footer">
        <div><el-button style="background-color: pink" @click="registerUser">注册用户</el-button></div>
        <div><el-button style="background-color: #2be2a2" @click="router.push('/')">返回登录</el-button></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from "axios";
import {Plus} from "@element-plus/icons-vue";
import router from "@/router";
const uploader = 'http://localhost:8001/api/upload'
const userinfoname = ref('')
const userinfopassword = ref('')
const userinfoemail = ref('')
const userinfodate = ref('')
const imageUrl = ref(null)


function isValidEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
const registerUser = () => {
  if ((userinfoname.value === '') || (userinfopassword.value === '')) {
    ElMessage.error('用户名或密码为空！')
    return
  }
  if (userinfopassword.value.length < 6) {
    ElMessage.error('密码长度不能小于6位！')
    return
  }
  if (!isValidEmail(userinfoemail.value)) {
    ElMessage.error('邮箱格式错误！')
    return
  }
  if (userinfodate.value === '') {
    ElMessage.error('请选择出生日期！')
    return
  }
  if (imageUrl.value === '') {
    ElMessage.error('请上传头像！')
    return
  }
  try {
    const userData = {
      name: userinfoname.value,
      password: userinfopassword.value,
      email: userinfoemail.value,
      birthday: userinfodate.value,
      avatar: imageUrl.value,
    };
    axios.post("http://localhost:8001/user/register", userData).then(response => {
      if (response.status === 200) {
        if (response.data === '用户注册成功') {
          ElMessage.success('注册成功');
        } else if (response.data === '用户已经存在') {
          ElMessage.error('用户已存在，注册失败！')
        } else {
          ElMessage.error("未知错误")
        }
      } else {
        ElMessage.error("请求失败，状态码不是200")
      }
    });
  } catch (error) {
    ElMessage.error('注册失败，请检查网络连接或后端服务！');
  }
}
const beforeAvatarUpload = (file) => {
  const isJPG = file.type === 'image/jpeg'
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isJPG) {
    ElMessage.error('上传头像图片只能是 JPG 格式!')
    return
  }
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return
  }
  const formData = new FormData()
  formData.append('image', file)
  axios.post(uploader, formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    imageUrl.value = 'http://localhost:8001'+ res.data
    ElMessage.success('上传成功')
  }).catch(err=>{
    console.log(err+'beforeAvatarUpload')
  })
}
</script>
<style>
.register-upload {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.register-main {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.register-main > * {
  margin: auto;
}
.img-upload {
  width: 50%;
  display: flex;
  flex-direction: column;
}
@media (max-width: 800px) {
  .register-upload {
    flex-direction: column;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #1162d5;
  width: 110px;
  height: 110px;
  text-align: center;
}
.avatar-uploader .el-upload:hover {
  border-color: cornflowerblue;
}
.avatar-uploader .el-upload {
  border: 1px dashed #13ceac;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
</style>
