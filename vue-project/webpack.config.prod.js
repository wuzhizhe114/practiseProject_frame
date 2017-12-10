
// import path from 'path';
const path = require('path');

//根据参照文件生成index.html
var HtmlWebpackPlugin = require('html-webpack-plugin');

//抽离第三方样式需要的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 生产环境
// import webpack from 'webpack';
const webpack = require('webpack');

// 每次打包前把旧的dist文件夹清掉
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // entry: './src/main.js', //入口
  // 抽离第三方包，入口改为对象，配置多个入口
  entry:{
    //属性名称，是最终生成好的js文件名称，值是我们安装时候的第三方包的名称
    mintUi:['mint-ui'],
    moment:['moment'],
    bucketsOf:['vue','vue-router','vuex'],
    vueResource:['vue-resource'],
    vuePreview:['vue-preview'],
    axios:['axios'],
    bundle:'./src/main.js' //别忘记自己写的源代码
  },
  output:{ // 出口
    path:path.join(__dirname,'dist'),
    filename:'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: [{
          loader: "vue-loader"
        }]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(ttf|png|gif|svg)$/,
        use: [{
          /*
            limit：
                表示的是一个阀值,如果当前我们资源中的图片大小
                4kb就从bundle.js中剥离出来，如果大于4kb打包进bundle.js,4kb只是我这设置的一个值,实际开发过程中要根据业务来

            name:抽离出来的图片，放在哪个文件夹下，用什么文件名称命名
                [name]代表你原始的文件名称
                [hash:5] 避免图片换了之后，浏览器还加在原先的图片,解决缓存的问题
                [ext] 图片本身的拓展名
          */
          loader: "url-loader?limit=4000&name=images/[name]-[hash:5].[ext]"
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /vue-preview.src.*?js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // 打包之前，清除原来的dist文件夹
    new CleanWebpackPlugin('dist'),

    new HtmlWebpackPlugin({
      template: './template.html', //参照文件
      filename: 'index.html' , //生成的index.html
      minify:{
        collapseWhitespace:true,//压缩空格
        removeComments:true,//去除注释
        minifyJS:true,//压缩js
        minifyCSS:true//压缩css
      }
    }),
    // 使用 webpack 的 DefinePlugin 来指定生产环境，以便在压缩时可以让 UglifyJS 自动删除警告代码块
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // 去除警告信息
      },
      comments: false // 去除版权信息
    }),
    //抽离第三方包的，这里不要写bundle.js
    new webpack.optimize.CommonsChunkPlugin({
      name: ['mintUi','moment','bucketsOf','vueResource','vuePreview','axios'],
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)
  
      minChunks: Infinity,
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
  }),
  new ExtractTextPlugin("css/styles.css"),
  ],
  resolve: {
    alias: {
      '@': './components' //定义文件前缀别名
    },
    extensions: ['.vue', '.js', '.json'] //自动补全文件的后缀
  },
  
}