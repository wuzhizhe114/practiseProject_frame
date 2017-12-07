<template>
  <div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsListArray" :key="item.id">
          <router-link :to="'/news/newsInfo/'+item.id">
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
              <p class='mui-ellipsis title'>{{item.title}}</p>
              <p class="mui-ellipsis zhaiyao">摘要：{{item.zhaiyao}}</p>
              <p class="time_click">
                <span>{{item.add_time | formatDate('YYYY-MM-DD HH:mm')}}</span>
                <span>点击数：{{item.click}}</span>
                </p>
            </div>
          </router-link>
        </li>
      </ul>
  </div>
</template>

<style scoped>
  .mui-table-view-cell {
    height: 80px;
  }
  .mui-table-view-cell>a {
    height: 80px;
  }
  .mui-table-view .mui-media-object {
    min-width: 65px;
    height: 65px;
  }
  .title {
    color: #333;
  }
  .zhaiyao,
  .time_click {
    font-size: 12px;
  }
  .time_click {
    color:#0069ff;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
</style>


<script>
  // 导入主机地址公共模块
  import common from '../../common/common.js';

  export default {
    data(){
      return {
        newsListArray:[]
      }
    },
    created () {
      this.getNewsListData();
    },
    methods: {
      getNewsListData(){
        // es6 模板字符串
        const url = `${common.hostUrl}api/getnewslist`;

        this.$http.get(url).then(response=>{
          this.newsListArray = response.body.message;
        });
      }
    }
  }
</script>
