<template>
  <div>
    <mheader>首页</mheader><!-- 父组件将参数back传给子组件 -->
    <loading v-if="loading"></loading>
    <div class="content" v-else>
      <lb :swiperSlides="swiperSlides"></lb>
      <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="(hot,index) in hotbooks" :key="index">
              <img :src="hot.bookCover" alt="">
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>
import mheader from '../base/mheader.vue'
import lb from '../base/lb.vue'
import loading from '../base/loading.vue'
import {getAllHome} from '@/api/index'
import tab from '../base/tab.vue'
export default {
   data () {
    return {
     swiperSlides:[],
     hotbooks:[],
     loading:true
    }
  },
  
  components:{
    mheader,
    lb,
    tab,
    loading
  },
  created(){
    this.getAllData();
    console.log('vconsole出来了')
  },
  methods:{
    async getAllData(){
       let  [getswiperSlides,gethotbooks]=await	getAllHome();
       this.swiperSlides=getswiperSlides;
       this.hotbooks=gethotbooks;
       this.loading=false;
    }
  }
}
</script>


<style scoped lang="less">
h3{
  color:gray;
  padding:5px 0;
}
.container{
  width:90%;
  margin:0 auto;
  ul{
    display: flex;
    flex-wrap: wrap;/* 默认不换行 */
    
    li{
      width:50%;
      margin:5px 0;
      text-align: center;
     
      img{
        width:100%;
      }
     
    }
  }
}

</style>
