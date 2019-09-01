// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化
Vue.config.productionTip = false 
/* 导入轮播插件 */
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
/* eslint-disable no-new */

//轮播
/* import Swiper from 'swiper'; 
import 'swiper/dist/css/swiper.min.css'; 
Vue.use(Swiper)*/
/**图片懒加载 */
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img1.imgtn.bdimg.com/it/u=3779605030,1222595953&fm=26&gp=0.jpg',
  loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
  attempt: 1
});
//在进入路由之前，每一次都会执行此方法，全局钩子，用if判断语句可以拦截
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title;
  next()
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
