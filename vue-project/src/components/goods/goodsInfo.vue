<template>
  <div>
    <!-- 使用轮播图子组件 -->
    <div class="sub-swipe">
      <sub-swipe :imgUrl="'api/getthumimages/'+this.$route.params.goodsId" :slideTime="1500"></sub-swipe>
    </div>

    <!-- 商品详情 -->
    <div class="goods-info">
      <h4>{{goodsInfo.title}}</h4>
      <p>市场价
        <del>￥: {{goodsInfo.market_price}}</del>&nbsp;&nbsp;
        <span>￥: {{goodsInfo.sell_price}}</span>
      </p>

      <!-- 数字输入框组件 -->
      <!-- 使用v-on：自定义事件名 监听子组件触发的事件 -->
      <sub-number :totalCount="goodsInfo.stock_quantity" v-on:changeNumber="selectedNum"></sub-number>

      <mt-button type="primary" size="small" @click="immediatelyShop">立即购买</mt-button>
      <mt-button type="danger" size="small" @click="joinCart()">加入购物车</mt-button>
    </div>

    <!-- 商品参数 -->
    <div class="goods-param">
      <h5>商品参数</h5>
      <p>商品货号：{{goodsInfo.goods_no}}</p>
      <p>库存情况：{{goodsInfo.stock_quantity}}</p>
      <p>上架时间：{{goodsInfo.add_time | formatDate}}</p>
    </div>

    <!-- 商品操作 -->
    <div class="goods-operation">
      <mt-button type="primary" @click="goGraphicIntroduction()" plain size="large">图文介绍</mt-button>
      <mt-button type="danger" @click="goGoodsComments()" plain size="large">商品评论</mt-button>
    </div>
  </div>
</template>

<style scoped>
  .sub-swipe,
  .goods-info,
  .goods-param,
  .goods-operation {
    margin: 10px;
    padding: 6px;
    border: 1px solid rgba(92, 92, 92, 0.3);
    overflow: hidden;
    border-radius: 5px;
  }

  .sub-swipe {
    margin-top: 50px;
  }

  .goods-info h4 {
    font-size: 16px;
    color: #0094ff;
    line-height: 20px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    padding-bottom: 6px;
  }

  .goods-info p span {
    color: #f10215;
  }

  .goods-param h5 {
    font-size: 16px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
  }

  .goods-param p {
    margin: 0;
    line-height: 20px;
    color: #666;
  }

  .goods-operation button:first-child {
    margin-bottom: 6px;
  }
</style>

<script>
  // 公共工具
  import common from '../../common/common.js'
  // 公共vue对象
  // import bus from '../../common/commonVue.js';

  //  轮播图子组件
  import subSwipe from '../subComponents/subSwipe.vue';
  // 数值输入子组件
  import subNumber from '../subComponents/subNumber.vue';

  export default {
    data() {
      return {
        goodsInfo: {},
        selectNumber:1,
      }
    },
    created() {
      common.startLoadingAnimate();
      // 调用 获取商品详情信息函数
      this.getGoodsInfoData();
    },
    methods: {
      // 获取商品详情信息函数
      getGoodsInfoData() {
        const url = `${common.hostUrl}api/goods/getinfo/${this.$route.params.goodsId}`;

        this.$http.get(url).then(response => {
          // console.log(response.body.message);

          this.goodsInfo = response.body.message[0];
          common.endLoadingAnimate();
        });
      },
      // 跳转到图文介绍组件
      goGraphicIntroduction() {
        // 使用编程式导航跳转
        this.$router.push({path: '/goods/graphicIntroduction',query: {goodsId: this.$route.params.goodsId}
        });
      },
      // 跳转到商品评论组件
      goGoodsComments() {
        // 使用编程式导航跳转
        this.$router.push({path: '/goods/goodsComments',query: {goodsId: this.$route.params.goodsId}
        });
      },
      // 接收子组件传回的数据
      selectedNum(num){
        this.selectNumber = num;
        // console.log(this.selectNumber);
      },
      // 加入购物车
      joinCart(){
        // console.log(this.selectNumber);
        // 非父子组件间传值 
        // 1，传值方触发事件
        // bus.$emit('goodsBadge', this.selectNumber);

        // 使用vuex 保存要加入的商品信息
        const goods = {
          goodsId:this.$route.params.goodsId,
          count:this.selectNumber
        }
        this.$store.commit('addGoods',goods);

        common.toastText('添加购物车成功');
      },
      // 立即购买
      immediatelyShop(){
        common.toastText('抱歉，功能未完善...');
      }
      
    },
    // 注册子组件
    components: {
      subSwipe,
      subNumber,
    }
  }
</script>