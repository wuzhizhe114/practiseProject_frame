<template>
  <div>
    <div class="photo-info">
      <h5>{{photoInfo.title}}</h5>
      <p class="info">
        <span>发布于：{{photoInfo.add_time | formatDate('YYYY-MM-DD')}}</span>&nbsp;&nbsp;
        <span>（{{photoInfo.click}}）人浏览过</span>
      </p>

      <!-- 缩略图 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item,index) of thumbImages" :key="index">
          <a href="#">
            <img :src="item.src" class="preview-img" alt="" @click="$preview.open(index, thumbImages)">
          </a>
        </li>
      </ul>

      <p class="content" v-html="photoInfo.content"></p>
    </div>

    <!-- 使用评论子组件 -->
    <sub-comment :commentId="this.$route.params.photoId"></sub-comment>
    <!-- 为什么不能使用下一种方式？？？ 因为上一方式能获取数据 所以是发送方出的问题 -->
    <!-- 有没有可能是因为注册的子组件先于图片详情的数据渲染抑或处于同步的状态，在子组件渲染的时候，请求详情数据的发送未返回，导致获取的图片详情数据是undefined ； 而上一种方式，因为直接从上一级页面带来，故而在vue对象中始终存在，所以就不存在此问题-->
    <!-- <sub-comment :commentId="photoInfo.id"></sub-comment> -->
  </div>
</template>

<style scoped>
  .photo-info {
    padding: 0px 5px;
  }

  .photo-info h5 {
    font-size: 16px;
    color: #0094ff;
    line-height: 24px;
  }
  .mui-table-view img {
    width: 100%;
  }
  .mui-grid-view.mui-grid-9 {
    border-radius: 5px;
    margin-bottom: 5px;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>

<script>
  import common from "../../common/common.js";

  // 评论子组件
  import subComment from '../subComponents/subComment.vue';

  export default {
    data() {
      return {
        // 图片详情信息（不包含缩略图）
        photoInfo: {},
        // 缩略图信息
        thumbImages:[],
      };
    },
    created() {
      // 获取图片详情信息（不包含缩略图）
      this.getPhotoInfo();
      // 获取缩略图信息
      this.getThumbImages();
    },
    methods: {
      // 获取图片详情信息（不包含缩略图）
      getPhotoInfo() {
        const url = `${common.hostUrl}api/getimageInfo/${this.$route.params.photoId}`;

        this.$http.get(url).then(response => {
          // console.log(response.body.message[0]);
          this.photoInfo = response.body.message[0];
        });
      },
      // 获取缩略图信息
      getThumbImages(){
        const url = `${common.hostUrl}api/getthumimages/${this.$route.params.photoId}`;

        this.$http.get(url).then(response=>{

          response.body.message.forEach(item => {
            item.w = 400;
            item.h = 400;
          });
          
          this.thumbImages = response.body.message;
          // console.log(this.thumbImages);
        });
      },
    },
    // 注册评论子组件
    components: {
      subComment,
    }
  };
</script>