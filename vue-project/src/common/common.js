/*
 * @Author: wuzhizhe/chenGuangHui 
 * @Date: 2017-12-03 11:03:13 
 * @Last Modified by: wuzhizhe/chenGuangHui
 * @Last Modified time: 2017-12-07 12:23:36
 */

// 加载时的动画提示
import {
  Indicator
} from 'mint-ui';
// 信息提示
import {
  Toast
} from 'mint-ui';

export default {
  //  抽取主机地址，便于在开发阶段和生产阶段的服务器域名的切换
  hostUrl: "http://vue.studyit.io/",

  // 开始加载时的动画效果
  startLoadingAnimate() {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'triple-bounce'
      // spinnerType: 'double-bounce'
    });
  },

  // 结束加载的动画效果
  endLoadingAnimate() {
    setTimeout(() => {
      Indicator.close();
    }, 900);
  },
  
  // 提示信息
  toastText(message) {
    Toast({
      message: message || '抱歉,评论信息不能为空!',
      position: 'middle',
      duration: 2000
    });
  },
}