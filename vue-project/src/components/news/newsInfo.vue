<template>
  <div>
    <!-- 新闻详情 标题 -->
    <div class="newsInfoTitle">
      <h4>{{newsInfo.title}}</h4>
      <p>
        <span>发布于：{{newsInfo.add_time | formatDate}}</span>
        <span>({{newsInfo.click}})人浏览过</span>
        <!-- <span>分类：民生经济</span> -->
      </p>
    </div>
    <!-- 新闻详情 内容 -->    
    <div class="newsInfoContent" v-html="newsInfo.content"></div>

    <!-- 评论子组件 -->
    <sub-comment :commentId="this.$route.params.newId"></sub-comment>
  </div>
</template>

<style scoped>
  .newsInfoTitle {
    padding: 6px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
  }
  .newsInfoTitle h4 {
    color: #0069ff;
  }
  .newsInfoTitle p {
    margin: 0;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .newsInfoContent {
    padding: 6px;
  }
</style>


<script>
  // 导入主机地址公共模块
  import common from '../../common/common.js';

  // 导入评论子组件
  import subComment from '../subComponents/subComment.vue';

  export default {
    data(){
      return {
        newsInfo:{}
      }
    },
    created () {
      this.getNewsInfoData();
    },
    // 注册子组件 es6新特性，属性名和属性值一致时可以只写一个
    components: {
      subComment,
    },
    methods: {
      getNewsInfoData(){
        const url = common.hostUrl + 'api/getnew/'+this.$route.params.newId;

        // console.log(url);
        this.$http.get(url).then(response=>{
          // console.log(response.body.message[0]);
          this.newsInfo = response.body.message[0];
        });
      }
    }
  }
</script>
