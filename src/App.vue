<template>
  <div id="app">
  <!--  <keep-Alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
   </keep-Alive> -->
   <!-- 正常的执行下面的语句 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
 
}
</script>

<style>
*{
  margin:0;
  padding: 0;
}
ul li{
  list-style: none;
}
a{
  text-decoration: none;
}
input,button{
  -webkit-appearance: none;
}
.content{
  position:absolute;
  top:40px;
  width:100%;
  bottom:51px;
  overflow: auto;
}
</style>
