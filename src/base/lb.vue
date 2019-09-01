<template>
<div class='swiper-container'>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(slide, index) in swiperSlides" :key="index"><img :src="slide" alt=""></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

 

<script>
 
  export default {
    name: 'carousel',
    props:['swiperSlides'],
  
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable:true
          },
          effect : 'fade',
      　　loop:true,
      　　autoplay: {
        　　delay: 1000,
        　　disableOnInteraction: false
      　　},
          
        }
       
      }
    }
 
  
   
  }
  
</script>
<style>
img{
  width:100%;
}
</style>
