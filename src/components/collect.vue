<template>
  <div class="detail">
      <mheader :back="true">首页</mheader>
     
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
    
    }
  },
  components:{
    mheader,
     tab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
