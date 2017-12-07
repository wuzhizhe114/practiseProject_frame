<template>
   <div>
      <mt-swipe :auto="slideTime">
        <mt-swipe-item v-for="(item,index) in slideArray" :key="index">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe>
   </div>
</template>
   
<style scoped>
  /* 轮播图 */
  .mint-swipe {
    width: 100%;
    height: 300px;
  }

  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
             slideArray: [],
           }
       },
      //  声明需要的参数
       props: ['imgUrl','slideTime'],
       created() {
           this.getSlideArrayData();
       },
       methods: {
        //  获取轮播图数据
        getSlideArrayData() {
          const url = common.hostUrl + this.imgUrl;
          // console.log(url);
          this.$http.get(url).then(response => {
            response.body.message.forEach(item => {
              if(item.src){
                item.img = item.src;
              }
            });

            this.slideArray = response.body.message;
          });
        }
       }
   }
</script>