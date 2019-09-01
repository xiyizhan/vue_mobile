import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  //mode:'history',//没有就是默认hash，即#/
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '*',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component:()=>import ('@/components/home.vue'),
      meta:{
       // keepAlive:true ,//路由元信息，keepAlive实现缓存
        title:"首页"
      }
    },
    {
      path: '/add',
      name: 'add',
      component:()=>import ('@/components/add.vue'),//动态加载组件
      meta:{title:"添加"}
    },
    {
      path: '/list',
      name: 'list',
      component: ()=>import ('@/components/list.vue'),
      meta:{title:"列表"}
    },
    {
      path: '/collect',
      name: 'collect',
      component: ()=>import ('@/components/collect.vue'),
      meta:{title:"收藏"}
    },
    {
      path: '/detail/:bid',
      name: 'detail',
      component: ()=>import ('@/components/detail.vue'),
      meta:{title:"详情"}
    }
   
  ]
})
