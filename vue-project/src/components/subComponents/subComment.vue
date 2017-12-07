<template>
  <div>
    <h4 class="commentTitle">众说纷纭</h4>
    <div class="commentWrapper">
      <textarea ref="textarea" name="comment" id="comment" cols="30" rows="6" placeholder="请文明发言..."></textarea>
      <mt-button type="primary" @click="commentSubmit" size="large">提交</mt-button>
      <hr>
      <div class="commentConent" v-for="(item,index) in commentList" :key="index">
        <p class="content">{{item.content}}</p>
        <p class="info">
          <span class="mui-pull-left">{{item.user_name}}</span>
          <span class="mui-pull-right">{{item.localTime}}</span>
        </p>
      </div>
      <mt-button @click="loadMoreComment" type="danger" plain size="large">加载更多</mt-button>
    </div>
  </div>
</template>

<style scoped>
  
  .commentTitle {
    margin: 0px;
    height: 40px;
    width: 100%;
    line-height: 40px;
    text-align: center;
    background-color: #eeeeee;
    color: darkcyan;
  }
  .commentWrapper {
    padding: 6px;
  }
  .commentConent {
    padding: 5px;
    border-bottom: 1px solid #ccc;
    height: 80px;
    overflow: auto;
    position: relative;
    margin-bottom: 5px;
  }
  .commentConent p {
    margin-bottom: 0;
    line-height: 24px;
  }
  .commentConent .content {
    height: 50px;
    overflow-y: auto;
    color: #333;
  }
  .commentConent .info {
    width: 100%;
    position: absolute;
    bottom: 4px;
    left: 5px;
    padding-right: 22px;
    color: #0069ff;
  }
</style>

<script>
  // 导入moment
  import moment from 'moment';
  // 设置中文
  moment.locale('zh-cn');

  // 导入工具包
  import common from '../../common/common.js';

  export default {
    data () {
      return {
        commentList:[],
        pageIndex:1,
      }
    },
    props: ['commentId'],
    created () {
      // console.log(this);
      // console.log(this.commentId+"-----------------");
      common.startLoadingAnimate();
      this.getCommentData();
    },
    methods: {
      // 加载评论数据
      getCommentData(){
        // es6 字符串模板
        const url = `${common.hostUrl}api/getcomments/
        ${this.commentId}?pageindex=${this.pageIndex}`;
        // console.log(this.commentId+"-----------------------------");
        
        this.$http.get(url).then(response=>{
          // console.log(response.body.message);
          let array = response.body.message;
          array.forEach(element => {
            // console.log(element.add_time);
            // 将时间格式转换成距此时的时间差格式，并给当前的每一项数据增加一个解析好的时间格式属性
            element.localTime = moment(element.add_time).startOf('second').fromNow();
          });
          // 判断页码是否为1，实则直接赋值给commentList 否则追加给commentList
          if(this.pageIndex === 1){
            this.commentList = array;
          }else{
            this.commentList = this.commentList.concat(array);
          }
          // console.log(this.commentList);
          common.endLoadingAnimate();
        });
      },
      // 点击加载更多评论数据
      loadMoreComment(){
        common.startLoadingAnimate();
        this.pageIndex ++;
        this.getCommentData();
      },
      // 提交评论信息
      commentSubmit(){
        // console.log(this.$refs.textarea.value);
        let content = this.$refs.textarea.value.trim();
        // 判断文本域内容是否为空，是则提示不能为空，否则，提交数据到服务器
        if(content){
          const url = common.hostUrl+'api/postcomment/'+this.commentId;
          
          this.$http.post(url,{content},{emulateJSON:true}).then(response=>{
            // console.log(response);
            common.toastText(response.body.message);
            // 清空文本域
            this.$refs.textarea.value = '';
            // 重新加载评论的第一页
            this.pageIndex = 1;
            this.getCommentData();
          });
        }else{
          common.toastText();
          this.$refs.textarea.value = '';
        }
      }
    }
  }
</script>

