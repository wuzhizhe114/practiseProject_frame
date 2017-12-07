<template>
  <div>
    <ul class="photo-category">
      <li @click="getPhotoList(0)">全部</li>
      <li v-for="item in photoCategoryList" :key="item.id" @click="getPhotoList(item.id)">
        {{item.title}}
      </li>
    </ul>
    <ul class="photo-list">
      <li v-show="photoList.length===0">此项暂未收录，敬请期待！</li>
      <li v-for="item in photoList" :key="item.id">
        <router-link :to="'/photo/photoInfo/'+item.id">
          <img :src="item.img_url" :alt="item.title">
          <p>
            <strong>{{item.title}}</strong>
            <br>
            <span>{{item.zhaiyao}}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  /* 分类列表 */

  .photo-category {
    margin: 5px;
    white-space: nowrap;
    overflow-x: auto;
    padding-bottom: 12px;
    color: #0094ff;
  }

  .photo-category li {
    display: inline-block;
    cursor: pointer;
    margin: 5px;
  }
  /* 图片列表 */

  .photo-list li {
    padding-bottom: 5px;
    position: relative;
  }

  .photo-list li img {
    width: 100%;
  }

  .photo-list li p {
    position: absolute;
    bottom: 0;
    left: 0;
    color: #eee;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }

  .photo-list li p strong {
    color: #fff;
    font-size: 15px;
  }
</style>

<script>
  import common from "../../common/common.js";

  export default {
    data() {
      return {
        photoCategoryList: [],
        photoList: []
      };
    },
    created() {
      // 获取图片分类列表数据
      this.getPhotoCategoryListData();
      // 第一次进入，显示全部图片
      this.getPhotoList(0);
    },
    methods: {
      // 分类列表
      getPhotoCategoryListData() {
        common.startLoadingAnimate();
        const url = `${common.hostUrl}api/getimgcategory`;

        this.$http.get(url).then(response => {
          // console.log(response.body.message);
          this.photoCategoryList = response.body.message;
          common.endLoadingAnimate();
        });
      },
      // 图片列表
      getPhotoList(photoId) {
        common.startLoadingAnimate();
        const url = `${common.hostUrl}api/getimages/${photoId}`;

        this.$http.get(url).then(response => {
          // console.log(response.body.message);
          this.photoList = response.body.message;
          common.endLoadingAnimate();
        });
      }
    }
  };
</script>