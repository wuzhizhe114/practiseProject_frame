// 导入第三方包
import Vue from 'vue';
// 基于vue的路由组件
import VueRouter from 'vue-router';

// 集成到vue上
Vue.use(VueRouter);
// 定义路由
const home = () => import('../components/home/home.vue');
const category = () => import('../components/category/category.vue');
const shopCart = () => import('../components/shopCart/shopCart.vue');
const mine = () => import('../components/mine/mine.vue');
const newsList = () => import('../components/news/newsList.vue');
const newsInfo = () => import('../components/news/newsInfo.vue');
const photoList = () => import('../components/photo/photoList.vue');
const photoInfo = () => import('../components/photo/photoInfo.vue');
const goodsList = () => import('../components/goods/goodsList.vue');
const goodsInfo = () => import('../components/goods/goodsInfo.vue');
const graphicIntroduction = () => import('../components/goods/graphicIntroduction.vue');
const goodsComments = () => import('../components/goods/goodsComments.vue');

// 创建路由对象
const router = new VueRouter({
  routes:[
    {path:'/',redirect:'/home'},// 重定向
    {path:'/home',component:home},
    {path:'/category',component:category},
    {path:'/shopCart',component:shopCart},
    {path:'/mine',component:mine},
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

// 导出路由对象
export default router;