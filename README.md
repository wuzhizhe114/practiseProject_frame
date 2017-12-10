## 1. Webpack + Vue 构建项目
- 1.1 参考文档：
	- [webpack 中文文档](https://doc.webpack-china.org/concepts/)
	- [vue 中文文档](https://cn.vuejs.org/v2/guide/)
- 1.2 搭建项目之创建项目必要的文件和文件夹

	注意:创建的项目的文件夹不要放在中文目录下，项目的名称不要有中文
	
	src: 项目源代码所在目录
		main.js 项目打包的入口文件
		App.vue 启动项目之后，用户看到的第一个组件
		
	package.json：项目的描述文件
	webpack.config.dev.js ： 开发阶段的webpack的配置文件
- 1.3 搭建项目，当更改了App.vue中内容的时候，实现热重载

		1、写好App.vue中的代码
			写在template之间
		
		2、在main.js中写代码
			2.1、导入App.vue
		
			2.2、使用Vue框架，把App.vue作为第一个让用户看到的组件
			安装vue: cnpm i vue --save
			创建根实例，在根实例中，让我们的框架第一个显示App.vue
		
		3、在webpack.config.dev.js中配置打包的指令
		入口
			loader: 
			安装`vue-loader`对我们.vue结尾的文件打包
			
		4、使用`html-webpack-plugin`，来根据参照文件(template.html)，生成一个index.html
			4.1、先写好template中的内容，里面要写上id=app的div
			4.2、安装`html-webpack-plugin`插件，在webpack.config.dev.js中写好代码
			参考:https://github.com/jantimon/html-webpack-plugin
			
		5、使用 webpack-dev-server 打包
			在我们项目的根目录下，运行下面的代码:
				webpack-dev-server --progress --config webpack.config.dev.js --open --port 6008 --hot
			
		解释:
			--progress 查看打包进度
			--config xxx.js 指定打包的配置文件
			--open 打开默认浏览器
			--port 6008 指定打开的端口，如果不指定，默认是8080
			--hot 启动热重载，告诉vue-loader可以进行热重载了

	注意：
		开发阶段，生成的index.html及bundle.js都发布到`webpack-dev-server`这个服务器上面去了，我们在项目里面是看不到生成的实实在在的这些文件的

- 1.4 相关插件

	mint-ui 基于Vue的移动端组件库:[https://mint-ui.github.io/#!/zh-cn](https://mint-ui.github.io/#!/zh-cn)

	mui UI组件库：[http://www.dcloud.io/hellomui](http://www.dcloud.io/hellomui)

	moment 日期处理类库：[http://momentjs.cn/docs/](http://momentjs.cn/docs/)

	预览图片：

	1. vue-preview，基于vue，地址：[https://github.com/LS1231/vue-preview](https://github.com/LS1231/vue-preview)
	2. photoswipe，纯原生，没有依赖于任何第三方库，地址：[http://photoswipe.com/documentation/getting-started.html](http://photoswipe.com/documentation/getting-started.html)

- 1.5 App.vue

	头部

		1、集成mint-ui到项目中
			安装
			main.js中，导入并且集成，Vue.use(xxx)
			
		2、在需要的地方去使用它
			App.vue的头部
	
	底部TabBar
	
	实现中间的路由部分

		1、集成vue-router到项目中
			安装
			main.js中，导入并且集成，Vue.use(xxx)
		
		2、在需要的地方去使用它	
			html中
				router-link：触发路径				
				router-view：占位符
				
			js中
				定义/新建组件
				创建路由对象，设置路由规则(自动帮助我们注册)
				把我们创建好的路由对象，注入到根实例中

- 1.6 home.vue

	轮播图

		1、利用vue-resource获取轮播的数据
			把vue-resource集成到我们项目中来
				安装
				在main.js中导入并且Vue.use(xxx)
				
			在需要的地方使用它
		
		2、使用mint-ui中的swipe组件来实现轮播功能
			参考:https://mint-ui.github.io/docs/#/zh-cn2/swipe

	九宫格布局

		1、把mui集成到项目中(假设它没有上传到npm)
		   把mui的dist目录下面的那些需要的内容，拷贝到当前目录下
		   在main.js导入其样式文件
			
		2、在需要使用它的地方，使用
			home.vue
	新闻列表

		1、点击首页的新闻资讯按钮，跳转到新闻列表组件
			在home.vue中，点击新闻咨询，使用router-link触发
			创建newslist.vue
			main.js中写代码，设置路由规则
		
		2、使用vue-resource发送网络请求
			this.$http.get(xxx).then()
			
			注意:
				必须在main.js中使用Vue.use(VueResource)
		
		3、渲染新闻列表
- 1.7 newslist.vue

	1、渲染
	
	2、对服务器返回的时间，进行过滤

		全局的过滤器 + momentjs
		
		全局过滤器的语法:
			Vue.filter('过滤器名称',处理函数)
			
		moment的语法
			moment(时间的原始数据)
			format(要格式化的时间格式字符串)

- 1.8 newsinfo.vue

		1、点击了新闻列表中的某一项，跳转到新闻详情组件，并且要带上新闻id
			newslist.vue中通过router-link实现跳转
			创建newsinfo.vue并且在main.js中导入，并且设置路由规则

		2、拿着新闻id获取新闻详情的数据
		
		3、渲染组件


- 1.9 显示和隐藏TabBar和导航栏的返回按钮

	要解决问题的关键点:

		监控路由的变化，获取当前的路径
		
		在App.vue中，通过`watch`监控`$route`，为什么要把监控的代码写在App.vue中
		因为我们导航栏的返回按钮和底部TabBar是写在App.vue中的
		
	步骤:

		1、根据路径来显示和隐藏导航栏上面的返回按钮
			创建一个返回按钮
			给返回按钮添加点击事件，并且通过编程式导航，进行回退
			参考:https://router.vuejs.org/zh-cn/essentials/navigation.html
		
		
		2、根据路径来显示和隐藏底部的TabBar
			还可以使用动态绑定class的方式来实现
			注意点：动态添加class也是根据boolean值
			参考:https://cn.vuejs.org/v2/guide/class-and-style.html
- 1.10 新闻详情组件中显示评论内容

	父组件:新闻详情组件

	子组件:评论子组件
	
		1、在父组件(新闻详情)包含/集成评论子组件
			1.1、新建一个评论子组件
			1.2、在父组件中导入评论子组件
			1.3、在父组件的`components`注册
			1.4、在父组件的template中，以自定义标签的形式使用子组件
	
		2、父组件把新闻id传递到子组件中去
			接收方(评论子组件):
				通过props来声明我要的值
				
			发送方(新闻详情父组件):
				在template中使用子组件的时候，通过属性名称=值的方式来传递
		
		3、子组件拿着新闻id去完成他自己的业务逻辑
			3.1、搭建子组件的UI界面
			3.2、完成评论数据的加载(包括加载更多)
			3.3、提交评论
- 1.11 图片分类 & 图片列表

	1、通过路由导航到photolist.vue

		1.1、创建photolist.vue
		1.2、在main.js中导入photolist.vue，设置路由规则
		1.3、在home.vue中，通过声明式导航，进行路由跳转
			
		注意点:我们在.vue文件中，除了通过template写内容，还可以通过自己实现js中的render函数来写组件内容
		
	2、实现图片分类

		2.1、先获取数据
			
		2.2、渲染

	3、根据分类id加载图片列表

		3.1、监听分类id的点击
			
		3.2、根据id获取对应id的图片列表数据
			
		3.3、渲染
- 1.12 商品详情组件

		1、创建goodsinfo.vue
		2、在main.js中，导入并且设置路由规则
		3、在goodslist.vue，通过声明式导航，触发路由
		
		完成商品详情数据的展示

		1、根据id获取数据
			
		2、渲染数据
- 1.13 子组件(subnumber.vue)传值给父组件(goodsinfo.vue)

	原理:通过自定义事件传递值
	
	步骤:

		1、创建subnumber.vue

		2、在父组件中集成subnumber.vue

		3、子组件当它内部数据变化之后，传递给父组件
		
	子组件传值给父组件

		接收方:(父组件)
			在使用子组件的地方，使用v-on监听事件，写好事件处理函数，并且这个函数是写在父组件的methods中的
		
		发送方:(子组件)
			使用this.$emit('自定义事件名称',值) 触发
			
	注意点:

		1、自定义事件千万不要和系统的，比如click、mouseover等冲突
		2、我们父组件中监听自定义事件的时候，写处理函数的时候，只需要写函数名称即可，千万不要加`()`调用
- 1.14 非父子关系组件传值

	原理:通过自定义事件传递值
	
	达到的目的：

		当我们点击了goodsinfo.vue加入购物车按钮，把值传递到App.vue组件中去，并且更新徽标的值
		
	步骤:

		1、先在App.vue的TabBar购物车那一个标签中，写一个徽标的span(默认值0)
		
		2、从goodsinfo.vue中把商品的数量值，传递到App.vue【重点】
			2.1、创建一个公共的Vue对象(bus)
			2.2、在发送方(goodsinfo.vue)，通过bus.$emit('自定义事件名称',值)
			2.3、在接收方(App.vue)中，通过bus.$on('自定义事件名称',处理函数)
		
		3、App.vue根据接收到的值，更新徽标上面的数组，如果是0隐藏，非0就显示
			遇到了一个问题，就是在处理函数中，通过this想更改badge，但是失败了，原因是里面this,现在代表的是bus对象

			解决方式：
				1. 可以在外面先把this保存起来
				2. 可以使用es6的箭头函数（箭头函数本身并没有this）
				3. 使用bind改变函数内部this的指向
- 1.15 Vuex

	全家桶:
		vue、vue-router、vuex

	作用:类似于仓库的作用，在项目中进行全局存取数据用的
	
	解释:

		状态 === 数据

		状态/数据 管理模式
		
	Vuex 是什么？
	
		专门给vue设计的状态管理模式，可以利用它，在全局中对数据进行增删改查
	Vuex的五个核心概念：

		state:最终存储数据的地方
		getter:从仓库中取
		mutation:同步往仓库中存，直接可以操作state中数据
		action:异步往仓库中存，不可以直接操作state中的数据，必须借助与mutations再操作
		
		module : 可以创建多个仓库
	使用Vuex

		1、把vuex集成到项目中
			1.1、安装
			1.2、在main.js中导入并且通过Vue.use(xxx)
		
		2、创建仓库
			2.1 通过 const store = new Vuex.Store({}) 创建仓库
			2.2 把创建好的仓库，注入到根实例，这样整个项目才能使用
		
		3、在项目中，通过写代码往仓库中存取数据
	在项目中，使用Vuex存取数据

		以goodsinfo.vue中 点击加入购物车为例，把数据存到仓库
	    在shopcart.vue 中 取出仓库中的值，展示
	    在App.vue中，取出仓库中放的商品的总个数，展示
	   
		1、先写state，它的值是一个对象，在这个对象里面，要写好我们存数数据的名称，它的格式是什么？比如数组，对象...
		
		2、写好mutations里面的代码，它也是一个对象，对象里面是函数（函数第一个参数是state，这是固定的写法）
			调用必须使用 this.$store.commit('方法名称',载荷)
			
		3、写好getters中的代码，getters中也是一个对象，对象里面也是一个方法（函数第一个参数是state，这是固定的写法）并且要有返回值
			调用必须使用 this.$store.getters.函数名称
			
		4、写actions中的代码
		
	注意：

		1、state、getter、mutation、action都是以对象的形式书写代码
		2、在mutations中写函数的时候，第一个参数是固定的，就是state,从第二个参数开始，就是载荷(说白了就是参数)
		3、在getters中写的方法，必须要有返回值，函数中的第一个参数也是state

	完成购物车页面的展示及操作

		比如我现在存储到仓库中的数据是下面这样滴
		[{goodsId:87,count:2},
		{goodsId:88,count:3},
		{goodsId:87,count:3}]
		
	步骤:

		1、先搞定数据
			1.1、先把 [{goodsId:87,count:2},
					  {goodsId:88,count:3},
		              {goodsId:87,count:3}] 
		              	  
		              var tempObj = {87:5,88:3}//因为后面获取的数据没有count，弄成这样的格式是为了方便取到count值
		              
		              var tempArray = [87,88].join(',')
		              
		              var idsString = 87,88
		              
		              发送网络请求
		              
					  最终数据格式：
		              [{
		              	id:87,
		              	title:'华为',
		              	count:5,// 网络请求回来后动态添加
		              	...
		              },{
		              	id:88,
		              	title:'苹果',
		              	count:3,
		              	...
		              }]
		
		2、渲染视图
			见代码
		
		3、对购物车的操作
			3.1、一进来计算总数量和总价格
			
			3.2、根据开关的状态，来重新计算总数量和总价格，并且设置开关的启用和禁用状态
			
			3.3、删除我们购物车中的某一项商品
				弹出一个确认删除框
					把该商品从仓库中删除(根据商品id来删除)	
					重新渲染(更改模型数据)
					//重新计算总数量和总价格(将计算的函数调用放在update钩子函数里可以不做这步)

			注意:我们统计总数量和总价格是根据开关的状态来的，只统计开启的商品项
- 1.16 使用webpack将项目打包成生产模式
	
	1、在项目根目录下创建一个生产阶段的webpack.config.prod.js配置文件

		注意:生产阶段配置文件中的内容，就是在开发阶段的基础上，多写一些针对生产环境的配置
		
	2、在package.json中增加一个scripts的配置

		"build":"webpack --progress --config webpack.config.prod.js"
		
	3、对我们项目中es6的代码转es5[babel]

		参考:https://babeljs.io/docs/setup/#installation 选择webpack构建工具
		
		3.1、安装包
			cnpm i babel-loader babel-core babel-preset-env --save-dev
		
		3.2、使用
			在当前根目录下，创建一个babel的配置文件，写好预设代码
				{
				    "presets": ["env"]
				}
				
			在webpack.config.prod.js中对js进行转换
				{ 
	                test: /\.js$/, 
	                exclude: /node_modules/, 
	                loader: "babel-loader" 
	            },
	            {
	                test: /vue-preview.src.*?js$/,
	                loader: 'babel-loader'
	            }
	            
	4、对bundle.js和index.html压缩

		压缩bundle.js
			参考:https://cn.vuejs.org/v2/guide/deployment.html
			在 webpack.config.prod.js 中配置
				new webpack.DefinePlugin({
		            'process.env': {
		              NODE_ENV: '"production"'
		            }
		        }),
		        new webpack.optimize.UglifyJsPlugin({
		            compress: {
		                warnings: false //压缩警告
		            },
		            comments: false //去掉版权信息等注释
		        })
	   	
	   	压缩index.html
	   		参考:https://github.com/jantimon/html-webpack-plugin
	   		https://github.com/kangax/html-minifier#options-quick-reference
				minify:{
	                collapseWhitespace:true,//压缩空格
	                removeComments:true,//去除注释
	                minifyJS:true,//压缩js
	                minifyCSS:true//压缩css
	            }
	            
	 5、对bundle.js进行优化

	 	达到的目的：
	 		bundle.js 尽可能小，可包含我们自己写的源代码
	 		
	 	什么原因造成他过大?
	 		项目中用的图标
	 		第三方包
	 		项目中的样式
	 6、 把项目中的图片和第三方包及样式，从bundle.js抽离出来
	
		1、从bundle.js中抽离图片(见代码)
		
		2、从bundle.js中抽离第三方包(见代码)
			entry:
				改成对象，多入口
				
			output
				改成多出口
				
			plugin
				见代码
				
		3、从bundle.js中抽离第三方样式
			使用一个第三方插件
				https://github.com/webpack-contrib/extract-text-webpack-plugin
		
		
		4、vue提供了路由懒加载（把每个组件从bundle.js中抽离出来，等需要的时候，再按需加载...）
			第一步：安装 https://babeljs.io/docs/plugins/syntax-dynamic-import/
			
			第二步：把router.js中，导入组件的方式改成 const Foo = () => import('./Foo.vue')
- 1.17 将打包好dist文件夹里的内容发布到云服务器上