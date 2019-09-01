<template>
  <div class="footer">
     <router-link to='/home'>
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
     </router-link>
     <router-link to='/add'>
        <i class="iconfont icon-tianjia1"></i>
        <span>添加</span>
     </router-link>
     <router-link to='/list'>
        <i class="iconfont icon-yewubaobiao"></i>
        <span>列表</span>
     </router-link>
     <router-link to='/collect'>
        <i class="iconfont icon-shoucang1"></i>
        <span>收藏</span>
     </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  watch: {
   	'$route':function (to, from) {
       alert("123123");
        console.log(from);
      
        }


			}

 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer{
  position: fixed;
  left:0;
  bottom:0;
  width:100%;
  height: 50px;
  display: flex;
  border-top:1px solid #ccc;
  a{
    display: flex;
    flex-direction: column;
    flex:1;
    align-items: center;//垂直居中
    justify-content: center;//水平居中
    color:yellowgreen;
  }
  a.router-link-active{
    color:red;
  }
}
</style>