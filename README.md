# generator

##demo展示

1.先安装node,`https://nodejs.org/en/`

2.进入根目录,执行npm install, 下载依赖包

3.执行`webpack`

4.下载静态server 指令, `npm install anywhere -g`

5.根目录下执行 `anywhere`,自动会打开浏览器`http://192.168.0.100:8000/`

6.浏览查看demo


##目录说明

	dist:最终生成目标资源
	html:静态html页面载体
	src/index.js:门面js
	src/index.less:全局样式
	src/app.vue:门面容器
	src/components:各模块
	src/assets:存放静态资源
	.babelrc:es6转化配置,由于移动端暂不支持es6,通过babel转化
	.gitgnore:不提交的文件
	devserver.js:本地开发执行配置,执行`node devserver`
	package.json:npm 依赖配置
	webpack.config.js:webpack配置
