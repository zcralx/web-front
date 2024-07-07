<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.background-image {
  background-image: url("./assets/images/04.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
}
.login-container {
  position: absolute;
  background-color: rgb(139, 150, 139);
  top: 15%;
  left: 25%;
  right: 25%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.12),0 0 6px rgba(0,0,0,0.04);
}
.login-footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  height: 45px;
}
.login-footer > * {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
