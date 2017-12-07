<template>
  <div>
    <!-- 使用 -->
    <sub-comment :commentId="$route.query.goodsId"></sub-comment>
  </div>
</template>
<script>
  // 评论子组件
  import subComment from '../subComponents/subComment.vue';

  export default {
    //  注册
    components: {
      subComment,
    }
  }
</script>