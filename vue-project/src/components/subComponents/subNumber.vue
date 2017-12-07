<template>
   <div>
      <div class="number">
        <span class="left" @click="subtraction">-</span>
        <span class="center">{{selectNumber}}</span>
        <span class="right" @click="add">+</span>
      </div>
   </div>
</template>
   
<style scoped>
   .number {
     margin-bottom: 6px;
   }
   .number span {
     display: inline-block;
     height: 30px;
     width: 30px;
     line-height: 30px;
     text-align: center;
     vertical-align: middle;
     border: 1px solid rgba(92, 92, 92, 0.3);
   }
   .number .center{
     width: 40px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
             selectNumber:1,
           }
       },
       props:['totalCount'],
       created() {
           
       },
       mounted(){
          
       },
       beforeUpdate(){
          // console.log(this.totalCount);
       },
       updated(){
          
       },
       methods: {
          //  减法
          subtraction(){
            if(this.selectNumber <=1){
              common.toastText('已经到底了...');
              return;
            }else{
              this.selectNumber --;
            }
            this.notify();
          },
          // 加法
          add(){
            // console.log('库存量为：',this.totalCount);
            if(this.selectNumber >=this.totalCount){
              common.toastText('已经到顶了...');
              return;
            }else{
              this.selectNumber ++;
            }
            this.notify();
          },
          // 通知父组件
          notify(){
            // emit(自定义事件名，参数)；
            this.$emit('changeNumber',this.selectNumber);
          }
       }
   }
</script>