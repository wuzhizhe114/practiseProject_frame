// 导入第三方包
import Vue from 'vue';
// 基于vue的移动端第三方组件库
import MintUI from 'mint-ui';
// 发送网络请求组件
import VueResource from 'vue-resource';
// 日期处理类库
import moment from 'moment';
// axios 基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用
import axios from 'axios';

// mint-ui的样式文件
import 'mint-ui/lib/style.min.css';
// mui 的样式文件
import './static/mui/css/mui.min.css';
// 自定义公共样式文件
import './static/css/style.css';
// 图片预览组件
import VuePreview from 'vue-preview';

// 将基于vue的组件 集成到vue上
Vue.use(MintUI);
// Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePreview);
// Vue.use(vuex);
// 给vue实例添加一个全局的axios方法，方便使用、
Vue.prototype.$axios = axios;

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

// 导入路由对象
import router from './routers/router.js';
// 导入vuex仓库对象
import store from './stores/store.js';

// 创建一个根实例
new Vue({
  el:'#app',
  router, // 挂载到根实例上
  store,
  render:h=>h(App)
});