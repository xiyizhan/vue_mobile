<template>
  <div class="header">
     <slot></slot><!-- 将父组件的内容显示在这里 -->
     <i class="iconfont icon-fanhui1" v-if="back" @click="goBack()"></i>
  </div>
</template>

<script>
export default {
    props: ['back'],
    data () {
    return {
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header{
    position:fixed;
    top:0;
    left:0;
    text-align: center;
    width:100%;
    background:#afd9ee;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    position: relative;
    i{
      position:absolute;
      left:10px;
      font-size:20px;
    }
  }
</style>
