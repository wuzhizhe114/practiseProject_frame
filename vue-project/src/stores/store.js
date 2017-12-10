// 导入第三方包
import Vue from 'vue';
// vuex 状态（数据）管理模式
import vuex from 'vuex';

// 集成到vue上
Vue.use(vuex);

// 创建仓库
const store = new vuex.Store({
  state:{
    goodsList:[],
  },
  mutations: {
    addGoods(state,goods){
      // 添加商品
      state.goodsList.push(goods);
    },
    // 删除指定商品
    delelteGoodsForId(state,goodsId){
      // 遍历数组，删除指定id的商品信息
      for(let i = state.goodsList.length-1; i >= 0; i--){
        let item = state.goodsList[i];
        if(item.goodsId == goodsId){
          state.goodsList.splice(i,1);
        }
      }
    }
  },
  actions:{

  },
  getters:{
    // 获取商品总数
    getTotalGoodsCount(state){
      let totalCount = 0;
      state.goodsList.forEach(goods=>{
        totalCount += goods.count;
      });
      return totalCount;
    },
    // 获取购物车数据
    getShopCartData(state){
      return state.goodsList;
    },
  }
});

// 导出仓库对象
export default store;