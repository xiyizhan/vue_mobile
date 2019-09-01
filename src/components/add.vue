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
          <label for="bookUrl">
            书的图片
          </label>
          <input type="text" id="bookCover" v-model="onebook.bookCover">
        </li>
        <li>
           <button @click="add">添加</button>
        </li>
      </ul>
       <tab></tab>
  </div>
</template>

<script>
import mheader from '../base/mheader.vue'
import {addBook} from '@/api'
import tab from '../base/tab.vue'
export default {
   data () {
    return {
      onebook:{}
    }
  },
  components:{
    mheader,
     tab
  },
  methods:{
    async add(){
      await addBook(this.onebook);
      this.$router.push('/list');
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
