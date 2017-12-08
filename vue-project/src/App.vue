<template>
  <div>
    <!-- 固定在顶部 -->
    <mt-header fixed title="Vue_project"></mt-header>
    <!-- 返回按钮 -->
    <i v-show="showOrHidden" @click="backNext" class="mintui mintui-back goBack"></i>

    <!-- 路由部分 -->
    <router-view class="router_view" :class="{'routerViewMarginBottom':showOrHidden}"></router-view>

    <!-- 固定在底部 -->
    <mt-tabbar :class="{'tabBarHidden':showOrHidden}" :fixed="true">
      <mt-tab-item>
        <!-- 声明式导航 -->
        <router-link to="/home">
          <img src="//st.360buyimg.com/m/images/index/a-home.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/category">
          <img src="//st.360buyimg.com/m/images/index/n-catergry.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/cart" class="router-link">
          <img src="//st.360buyimg.com/m/images/index/n-cart.png">
          <span v-show="count" class="mui-badge goods-badge">{{count}}</span>
        </router-link>

      </mt-tab-item>
      <mt-tab-item>
        <img src="//st.360buyimg.com/m/images/index/n-me.png">
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<!-- ************************************************************** -->
<!-- scoped 表示只在当前组件的范围内生效 -->
<style scoped>
  .mint-tab-item {
    padding: 0;
  }

  .mint-tab-item-label img {
    vertical-align: middle;
    height: 50px;
  }

  .router_view {
    margin-top: 40px;
    margin-bottom: 50px;
  }

  .goBack {
    position: fixed;
    top: 10px;
    left: 15px;
    font-size: 24px;
    color: #fff;
    font-weight: 700;
    z-index: 2;
  }
  .router-link {
    display: block;
    position: relative;
  }
  .goods-badge {
    position: absolute;
    top: 0;
    right: 12px;
    background-color: #f10215;
    color: #fff;
  }
  /* 隐藏的TabBar的样式 */

  .tabBarHidden {
    display: none;
  }
  /* TabBar隐藏时 取消中间路由的底部外边距 */

  .routerViewMarginBottom {
    margin-bottom: 0;
  }
</style>
<!-- ************************************************************** -->
<script>
  // 公共vue对象
  // import bus from './common/commonVue.js';

  export default {
    data() {
      return {
        showOrHidden: false,
        count:0,
      };
    },
    methods: {
      backNext() {
        // 编程式导航
        this.$router.go(-1);
      },
      // 判断当前的地址是否为首页
      isShowOrHidden(path) {
        if (path === "/home") {
          this.showOrHidden = false;
        } else {
          this.showOrHidden = true;
        }
      }
    },
    created() {
      // console.log(this.$route.path);
      // 强制刷新时，不会进入watch，因为是重新发送请求，所以依然会进入这个方法
      this.isShowOrHidden(this.$route.path);

      // 非父子组件间传值
      // 2.接收方监听事件
      // bus.$on('goodsBadge', num=>{
      //   this.count += num;
      // })

      
    },
    updated(){
      // 改用vuex 获取商品总数，显示为徽标值,因为数据需要更新，所以写到updated里面
      this.count = this.$store.getters.getTotalGoodsCount;
    },
    // 监听路由的变化
    watch: {
      $route(newVal, oldVal) {
        // console.log(newVal.path);
        this.isShowOrHidden(newVal.path);
      }
    }
  };
</script>