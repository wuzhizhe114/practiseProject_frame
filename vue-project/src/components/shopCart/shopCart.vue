<template>
  <div>
    <div class="m-bottom">
      <div class="wrapper" v-for="(item,index) of shopCartList" :key="item.id">
      <div class="toggle">
        <mt-switch v-model="item.toggle" @change="getTotalPrice()"></mt-switch>
      </div>
      <div class="goods-pic">
        <img :src="item.thumb_path" alt="">
      </div>
      <div class="content">
        <h5>{{item.title}}</h5>
        <p>
          <span>￥：{{item.sell_price}}</span>
          <span>数量：{{item.count}}</span>
        </p>
      </div>
      <div class="delete-btn">
        <mt-button type="danger" :disabled="!item.toggle" size="small" @click="deleteGoodsForId(item.id,index)">删除</mt-button>
      </div>
    </div>
    </div>
    <div class="total-price">
      <div class="left">
        <h4>总价（不含运费）</h4>
        <p>
          已经勾选商品 <span>{{totalCount}}</span> 件，总价：<span>{{totalPirce}}</span><sub>元</sub>
        </p>
      </div>
      <div class="right">
        <mt-button size="normal" type="danger">去结算</mt-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  p {
    margin: 0;
  }
  .m-bottom {
    margin-bottom: 80px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 0px 5px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.3);
  }
  .goods-pic {
    padding: 5px;
    border: 1px solid rgba(92, 92, 92, 0.3);
    border-radius: 5px;
    margin-right: 5px;
    margin-left: 5px;
  }
  .goods-pic img {
    width: 65px;
    height: 65px;
    vertical-align: middle;
  }
  .content {
    flex: 1;
  }
  .content p{
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .content p span:first-of-type {
    color: #f10215;
  }
  .content p span:last-of-type {
    color: #666;
  }
  h5 {
    color: #0094ff;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 16px;
  }
  .delete-btn {
    margin-left: 5px;
  }
  .total-price {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #ccc;
    z-index: 3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
  }
  .total-price p span {
    color: #f10215;
    font-size: 18px;
  }
</style>

<script>
  import {MessageBox} from 'mint-ui';
  import common from '../../common/common.js';

  export default {
    data() {
      return {
        shopCartList: [],
        // 商品总数
        totalCount :0,
        // 总价
        totalPirce:0
      }
    },
    created() {
      common.startLoadingAnimate();
      // 获取购物车商品数据
      this.getShopCartData();
    },
    updated () {
      // 获取商品总价
      this.getTotalPrice();
    },
    methods: {
      // 获取购物车商品数据
      getShopCartData() {
        const goodsList = this.$store.getters.getShopCartData;

        if (goodsList.length > 0) {
          // 定义一个空对象接收包装后的数据
          let tempObj = {};
          goodsList.forEach(item => {
            if (tempObj[item.goodsId]) {
              tempObj[item.goodsId] += item.count;
            } else {
              tempObj[item.goodsId] = item.count;
            }
          });

          // 定义一个空数组，接收用户保存的商品ID
          let tempArray = [];
          for (const key in tempObj) {
            tempArray.push(key);
          }

          // 发送请求的参数字符串
          const idsStr = tempArray.join(',');

          // 请求的地址
          const url = `${common.hostUrl}api/goods/getshopcarlist/${idsStr}`;

          // 实际也是发送ajax请求，注意数据延迟的影响
          this.$http.get(url).then(response => {
            // 遍历新增count属性
            response.body.message.forEach(item => {
              item.count = tempObj[item.id];
              // 给每条信息添加一个独立的开关 默认为true
              item.toggle = true;
            });

            // 赋值
            this.shopCartList = response.body.message;
            // this.getTotalPrice();
            common.endLoadingAnimate();
          });
        } else {
          common.toastText('暂无数据');
          common.endLoadingAnimate();
        }
      },
      // 根据开关的启用或禁用状态计算商品总价
      getTotalPrice(){
        // 遍历当前数据列表的每一项，判断其toggle属性是否为true，是则计入总价，否则忽略
        // 接收总价
        let totalPrice = 0;
        // 接收商品总数
        let totalCount = 0;
        this.shopCartList.forEach(item=>{
          if(item.toggle){
            totalCount += item.count;
            totalPrice += (item.count * item.sell_price);
          }
        });
        // 赋值
        this.totalPirce = totalPrice;
        this.totalCount = totalCount;
      },
      // 根据当前商品的id和索引来删除商品
      deleteGoodsForId(goodsId,index){
        MessageBox.confirm('确定删除此商品吗?').then(action => {
          common.startLoadingAnimate();
          // console.log(goodsId);
          this.$store.commit('delelteGoodsForId',goodsId);

          // 删除选中的那个
          this.shopCartList.splice(index,1);

          // vue是数据驱动的，只需要修改数据，相对应的视图便会更新，而且计算总价的函数写在update钩子函数中，所以也不需要手动重新计算
          // this.getShopCartData();
          // this.getTotalPrice();
          common.endLoadingAnimate();
        },cancel=>{
          console.log('取消操作');
        });
      }
    }
  }
</script>