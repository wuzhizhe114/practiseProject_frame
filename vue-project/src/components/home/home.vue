<template>
  <div>
    <!-- 1.0 轮播图 -->
    <sub-swipe imgUrl="api/getlunbo" :slideTime="3000"></sub-swipe>

    <!-- 2.0 九宫格布局 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/news/newsList">
          <span class="mui-icon newsInfo"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/photo/photoList">
          <span class="mui-icon picShare">
            <span class="mui-badge">5</span>
          </span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/goods/goodsList">
          <span class="mui-icon productShop"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon videoZone"></span>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon feedback"></span>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <span class="mui-icon contactOwn"></span>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  // 轮播图子组件
  import subSwipe from '../subComponents/subSwipe.vue';

  export default {
    // 注册子组件
    components: {
      subSwipe
    }
  };
</script>

<style scoped>
  /* 轮播图 */

  .mint-swipe {
    width: 100%;
    height: 240px;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
  /* 九宫格 */

  ul.mui-grid-view.mui-grid-9 {
    background-color: #fff;
  }

  ul.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    padding: 0;
    margin: 0;
  }

  .mui-icon {
    width: 50px;
    height: 50px;
  }

  .mui-table-view-cell .newsInfo {
    background: url('../../static/images/menu3.png') center/100% 100%;
  }

  .mui-table-view-cell .picShare {
    background: url('../../static/images/menu4.png') center/100% 100%;
  }

  .mui-table-view-cell .productShop {
    background: url('../../static/images/menu5.png') center/100% 100%;
  }

  .mui-table-view-cell .videoZone {
    background: url('../../static/images/menu6.png') center/100% 100%;
  }

  .mui-table-view-cell .feedback {
    background: url('../../static/images/menu9.png') center/100% 100%;
  }

  .mui-table-view-cell .contactOwn {
    background: url('../../static/images/menu10.png') center/100% 100%;
  }
</style>