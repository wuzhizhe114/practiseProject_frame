// 导入第三方包
import Vue from 'vue';
// 基于vue的移动端第三方组件库
import MintUI from 'mint-ui';
// 基于vue的路由组件
import VueRouter from 'vue-router';
// 发送网络请求组件
import VueResource from 'vue-resource';
// 日期处理类库
import moment from 'moment';

// mint-ui的样式文件
import 'mint-ui/lib/style.css';
// mui 的样式文件
import './static/mui/css/mui.css';
// 自定义公共样式文件
import './static/css/style.css';
// 图片预览组件
import VuePreview from 'vue-preview';

// 将基于vue的组件 集成到vue上
Vue.use(MintUI);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePreview);

// 定义路由 单页面路由容器
import home from '@/home/home.vue';
import category from '@/category/category.vue';
import newsList from './components/news/newsList.vue';
import newsInfo from './components/news/newsInfo.vue';
import photoList from './components/photo/photoList.vue';
import photoInfo from './components/photo/photoInfo.vue';
import goodsList from './components/goods/goodsList.vue';
import goodsInfo from './components/goods/goodsInfo.vue';
import graphicIntroduction from './components/goods/graphicIntroduction.vue';
import goodsComments from './components/goods/goodsComments.vue';

// 创建路由对象
const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},// 重定向
    {path:'/home',component:home},
    {path:'/category',component:category},
    {path:'/news/newsList',component:newsList},
    {path:'/news/newsInfo/:newId',component:newsInfo},
    {path:'/photo/photoList',component:photoList},
    {path:'/photo/photoInfo/:photoId',component:photoInfo},
    {path:'/goods/goodsList',component:goodsList},
    {path:'/goods/goodsInfo/:goodsId',component:goodsInfo},
    {path:'/goods/graphicIntroduction',component:graphicIntroduction},
    {path:'/goods/goodsComments',component:goodsComments},
  ]
});

// 导入App.vue
import App from './App.vue';

// 全局过滤器
Vue.filter('formatDate',(input,formatStr)=>{
  const lastFormatStr = formatStr || "YYYY-MM-DD HH:mm:ss";
  /**
   * moment里面接的参数，要过滤的原始时间，比如2015-04-16T03:50:28.000Z
   * format里面接的参数，要格式化成的字符串
   */
  return moment(input).format(lastFormatStr);
});

// 创建一个根实例
new Vue({
  el:'#app',
  router, // 挂载到根实例上
  render:h=>h(App)
});