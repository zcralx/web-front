<template>
  <h2>欢迎{{ name }}</h2>
  <div>
    <div class="block">
      <div class="image-block" >
        <el-image style="margin:auto;width: 90%;height: 90%" :src="url"/>
      </div>
      <el-card class="info-block">
        <el-descriptions title="用户信息" :column="1">
          <el-descriptions-item label="用户名">{{ name }}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{ email }}</el-descriptions-item>
          <el-descriptions-item label="余额">{{ money }}</el-descriptions-item>
          <el-descriptions-item label="生日">{{ birthday }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
  <div style="margin-top: 25px"><el-calendar/></div>
</template>
<style scoped>
.block{
  display: flex;
  justify-content: space-between;
}
.image-block{
  display: flex;
  margin:auto;
  width: 25%;
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.info-block{
  margin:auto;
  width: 45%;
  height: 200px;
}
</style>
<script setup>
import router from "@/router";

import {onMounted, ref} from "vue";

const email = ref('')
const name = ref('')
const money = ref('')
const birthday = ref('')
const url = ref('')
onMounted(() => {
  const routerQuery = router.currentRoute.value.query
  name.value = routerQuery.UserName
  email.value = routerQuery.Email
  money.value = routerQuery.Money
  birthday.value = routerQuery.Birthday
  url.value = routerQuery.UserAvatar
})
</script>
