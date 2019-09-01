<template>
  <div class="detail">
      <mheader :back="true">首页</mheader>
      <ul>
        <li>
          <label for="bookName">
            书的名称
          </label>
          <input type="text" id="bookName" v-model="onebook.bookName">
        </li>
        <li>
          <label for="bookInfo">
            书的信息
          </label>
          <input type="text" id="bookInfo" v-model="onebook.bookInfo">
        </li>
        <li>
          <label for="bookPrice">
            书的价格
          </label>
          <input type="text" id="bookPrice" v-model="onebook.bookPrice">
        </li>
        <li>
           <button @click="update">确认修改</button>
        </li>
      </ul>
  </div>
</template>

<script>
import mheader from '../base/mheader.vue'
import {findBook,updateBook} from '@/api/index'
export default {
  name: 'HelloWorld',
  data () {
    return {
     onebook:{}
    }
  },
  created(){
    this.findOneBook();
  },
  components:{
    mheader
  
  },
  computed:{
    bid(){
      return this.$route.params.bid
    }
  },
  methods:{
    async findOneBook(){
       this.onebook= await findBook(this.bid);
       Object.keys(this.onebook).length>0?void 0:this.$router.push('/list');
    },
    async update(){
      this.onebook=await updateBook(this.bid,this.onebook);
      this.$router.push('/list')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail ul{
  width:90%;
  margin:10px auto 0;
}
.detail ul li{
  margin-top:10px;
}
.detail label{
 display: block;
 font-weight: 600;
}
.detail input{
 width:100%;
 margin-top:10px;
 height: 30px;
}
.detail button{
  background:#12aaf7;
  color:white;
  width:70px;
  height: 30px;
  outline: none;
  border:none;
  border-radius: 5px;
  font-size:12px;
}
</style>
