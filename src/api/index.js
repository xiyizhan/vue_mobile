import axios from 'axios'
axios.defaults.baseURL='http://172.20.10.2:5002';
/*在这里统一拦截结果，把结果处理成res.data*/
axios.interceptors.response.use((res)=>{
	return res.data;
});
//在这里统一进行请求拦截，在header带token值
axios.interceptors.request.use(config => {
//     // 设置以 form 表单的形式提交参数，如果以 JSON 的形式提交表单，可忽略
  // 下面会说在什么时候存储 token
    config.headers['Authorization'] = 'small mi';
    config.headers['Accept'] = 'application/json';
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    // store.dispatch('logined', localStorage.token)
  return config
},error =>{
  alert("错误的传参", 'fail')
  return Promise.reject(error)
})

//增加默认的请求路径
//获取轮播图数据
export let getSliders=()=>{
   return axios.get('/sliders')
}
//获取热门图书
export let getHotBooks=()=>{
    return axios.get('/hot')
 }
 //获取所有图书
export let getBooks=()=>{
    return axios.get('/book')
 }
 //删除图书
 export let removeBook=(bookId)=>{
    return axios.delete(`/book?id=${bookId}`)
 }
 //获取某一本书
 export let findBook=(id)=>{
    return axios.get(`/book?id=${id}`)
 }
 //修改某一本书
 export let updateBook=(id,data)=>{
    return axios.put(`/book?id=${id}`,data)
 }
 //添加一本书
 export let addBook=(data)=>{
    return axios.post(`/book?`,data)
 }

 //将home页的轮播和热门数据交互整合,当两次请求同时完成再继续执行后面的代码
 export let getAllHome=()=>{
     return axios.all([getSliders(),getHotBooks()])
 }

 //列表加载更多，分页
 export let pagination=(offset)=>{
    return axios.get(`/page?offset=${offset}`)
 }
