<template>
  <el-scrollbar style="background-color: #303133">
    <el-menu
        :default-openeds="[]"
        active-text-color=red
        background-color="#303133"
        text-color="#fff"
        border-right: none
    >
      <el-menu-item index="1" @click="goToMenuView">
        <template #title>
          <i class="el-icon-s-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
    </el-menu>
    <el-menu
        :default-openeds="[]"
        active-text-color=red
        background-color="#303133"
        text-color="#fff"
        border-right: none
    >
      <el-sub-menu index="1">
        <template #title>功能菜单</template>
        <el-menu-item-group>
          <el-menu-item @click="goToUserList" index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">作者管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>主题切换</template>
        <el-menu-item-group>
          <el-menu-item @click="setTheme('blue')" index="2-1">蓝色风格</el-menu-item>
          <el-menu-item @click="setTheme('yellow')" index="2-2">黄色风格</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>待定页面</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">待定功能1</el-menu-item>
          <el-menu-item index="3-2">待定功能2</el-menu-item>
          <el-menu-item index="3-3">待定功能3</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import router from "@/router";

export default {
  computed: {
    ...mapState(['bgColor', 'pColor'])
  },
  methods: {
    goToMenuView () {
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
    },
    goToUserList () {
      router.push({
        path: '/userlist'
      })
    },
    ...mapMutations(['SET_BGCOLOR', 'SET_PCOLOR']),
    setTheme (newColor) {
      if (newColor === 'yellow') {
        this.SET_BGCOLOR('#b76d18')
        this.SET_PCOLOR('#F1B368')
      } else if (newColor === 'blue') {
        this.SET_BGCOLOR('cornflowerblue')
        this.SET_PCOLOR('#A4D7E8')
      }
    }
  },
  mounted () {
    console.log(this.bgColor, this.pColor)
  }
}
</script>
<style>
.el-sub-menu {
  background-color: v-bind('bgColor');
}
</style>
