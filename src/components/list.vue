<template>
  <div>
     <mheader :back="true">首页</mheader>
     <div class="content" ref="scr" @scroll="loadMore">
        <ul>
          <router-link v-for="(book,index) in books" :key="index" tag="li" :to="{name:'detail',params:{bid:book.bookId}}">
            <img v-lazy="book.bookCover" alt="">
            <div class="bookInfos">
                <h4>{{book.bookName}}</h4>
                <p>{{book.bookInfo}}</p>
                <b>{{book.bookPrice}}</b>
                <button @click.stop='remove(book.bookId)'>删除</button>
            </div>
          </router-link>
        </ul>
        <div class="btn">
          <button @click="getMore"> 加载更多</button>
        </div>
     </div>
     
     <tab></tab>
     
  </div>
</template>

<script> 
import mheader from '../base/mheader.vue'
import {pagination,removeBook} from '@/api/index'
import tab from '../base/tab.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
     books:[],
     hasMore:false,
     offset:0,
     isLoading:false
    }
  },
  components:{
    mheader,
    tab
  },
  created:function(){
    this.getMore();
  },
  mounted:function(){
    /**下拉刷新 */
   /*  let scroll=this.$refs.scr;
    let top=scroll.offsetTop;
    let distance=0;
    scroll.addEventListener('touchstart',(e)=>{
      let start=e.touches[0].pageY;//获取起始位置Y值
      let move=(e)=>{
        let current=e.touches[0].pageY;
        distance=current-start;
        if(distance>0){ //从上往下滑动
          if(distance>50){
             distance=50;
          }
           scroll.style.top=top+distance+"px";
        }else{ //无效操作,从下往上滑
          scroll.removeEventListener('touchmove',move);
          scroll.removeEventListener('touchend',end);
        }
      }
      let end=(e)=>{
       clearInterval(this.timer1)
       this.timer1=setInterval(()=>{
           distance-=1;
           scroll.style.top=top+distance+"px";
           if(distance<=0){
             distance=0;
             clearInterval(this.timer1);
             scroll.addEventListener('touchmove',move);
             scroll.addEventListener('touchend',end);
             this.books=[];
             this.getMore();
             console.log(this.books.length);
           }
        },1)
      }
      scroll.addEventListener('touchmove',move)
      scroll.addEventListener('touchend',end)
    }) */
  },
  methods:{
    async getMore(){
      if(!this.isLoading){ //当刚一进来调用此方法，没有正在加载时执行以下
         this.isLoading=true;
         let{hasMore,books}=await pagination(this.offset);
         this.books=[...this.books,...books];
         this.hasMore=hasMore;
         this.offset=this.books.length;
         this.isLoading=false;
      }
    },
    async remove(id){
      this.books=await removeBook(id);
      
    },
    loadMore(){
      //为了节流，采取定时器
     clearTimeout(this.timer);
     this.timer= setTimeout(()=>{
          let {scrollTop,clientHeight,scrollHeight}=this.$refs.scr;
          // console.log(scrollTop);//滚动卷去的高度
          //  console.log(clientHeight);//窗口可见高度
          //console.log(scrollHeight);//文档的高度
            if(scrollTop+clientHeight+20>scrollHeight){
              this.getMore();
            }
       },50)
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content ul{
  padding:10px;
}
.content ul li{
  align-items: center;
  display:flex;
  padding:10px 0;
  padding-bottom: 1px solid #f1f1f1;
  border-top:1px solid gainsboro;
}
.content ul li img{
 width:150px;
 height: 180px;
}
.content .bookInfos{
  margin-left:40px;
}
.content h4{
  font-size:20px;
  line-height: 35px;
}
.content p{
  color:#2a2a2a;
  line-height: 35px;
}
.content b{
  color:red;
}
.content button{
  display: block;
  width:60px;
  height: 35px;
  background:orange;
  color:#fff;
  border:none;
  border-radius: 15px;
  outline: none;
}
.btn button{
  width:100%;
}
</style>
