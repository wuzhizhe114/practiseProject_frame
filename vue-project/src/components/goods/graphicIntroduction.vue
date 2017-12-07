<template>
  <div>
    <!-- 图文介绍组件{{$route.query.goodsId}} -->
    <h4>{{graphicIntroduction.title}}</h4>
    <div id="info" v-html="graphicIntroduction.content"></div>
  </div>
</template>

<style scoped>
  h4,
  #info {
    padding: 6px;
  }
  h4 {
    color: #0094ff;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
  }
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data() {
      return {
        graphicIntroduction: {}
      }
    },
    created() {
      this.getGraphicIntroduction();
    },
    methods: {
      getGraphicIntroduction() {
        const url = `${common.hostUrl}api/goods/getdesc/${this.$route.query.goodsId}`;

        this.$http.get(url).then(response=>{
          // console.log(response.body.message[0]);

          this.graphicIntroduction = response.body.message[0];
        });
      }
    }
  }
</script>