<template>
  <div>
    <ul class="mui-table-view mui-grid-view">
      <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
        <div class="goodsItemStyle">
          <router-link :to="'/goods/goodsInfo/'+item.id">
            <img class="mui-media-object" :src="item.img_url">
            <div class="mui-media-body">
              <!-- 标题部分 -->
              <p>{{item.title}}</p>
              <!-- 价格信息 -->
              <p class="priceStyle">
                <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                <del>{{item.market_price}}</del>
              </p>
              <!-- 提示信息 -->
              <p>
                <span>热卖中</span>
                <span>剩余{{item.stock_quantity}}件</span>
              </p>
            </div>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .mui-table-view.mui-grid-view {
    padding: 0px;
    padding-left: 3px;
    margin-bottom: 5px;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell {
    padding: 5px 8px;
  }

  .goodsItemStyle {
    border: 1px solid rgba(92, 92, 92, 0.3);
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(92, 92, 92, 0.3);
  }

  img {
    padding: 8px;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
    height: 100px;
    ;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p:first-child {
    text-align: left;
    margin-left: 3px;
    margin-right: 3px;
    color: black;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .priceStyle {
    height: 35px;
    line-height: 35px;
    margin-right: 3px;
    text-align: left;
    margin-left: 3px;
    background-color: #f0f0f0;
  }

  .priceStyle span {
    font-size: 16px;
    color: red;
  }

  .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p:last-child {
    height: 30px;
    line-height: 30px;
    text-align: left;
    margin-left: 3px;
    margin-right: 3px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: space-between;
  }
</style>

<script>
  import common from '../../common/common.js'

  export default {
    data() {
      return {
        goodsList: [],
      }
    },
    created() {
      this.getGoodsListData();
    },
    methods: {
      getGoodsListData() {
        const url = `${common.hostUrl}api/getgoods`;

        this.$http.get(url).then(response => {
          // console.log(response.body.message);
          this.goodsList = response.body.message;
        });
      }
    }
  }
</script>