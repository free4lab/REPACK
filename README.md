# REPACK
> 
> 一款面向页面的前端框架
> 
> “页面”是Web应用最基本的组成部分
> 
> 官方网站：[http://repack.free4inno.com/](http://repack.free4inno.com/)


##功能特点
###面向页面
REPACK直接提供“页面”范例和模板，

直接引用页面快速“搭建”应用！
###响应式布局
REPACK完美支持响应式布局，

一次开发，手机、平台、PC随处使用！
###丰富而强大
REPACK对bootstrap和jQuery进行了扩展，

支持更多CSS组件和js组件！
###灵活易定制
REPACK基于Sass构建，易于定制、扩展和维护，

使用gulp作为编译工具，框架编译简单易行！


## 开始使用 
### 引用在线资源 


在页面引入我们提供的在线css和js文件，便可以使用REPACK提供的所有基本功能。

    # CSS
    <link rel="stylesheet" href="http://newfront.free4inno.com/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://newfront.free4inno.com/css/front.css">
    
    # JS
    <script src="http://newfront.free4inno.com/js/jquery/jquery.min.js"></script>
    <script src="http://newfront.free4inno.com/bootstrap/js/bootstrap.min.js"></script>
    <script src="http://newfront.free4inno.com/js/plugin/front.js"></script>

###下载文件
  也可以选择将资源下载到本地进行开发和使用。

下载资源包括编译并压缩过的CSS和JavaScript文件。

[下载地址](http://newfront.free4inno.com/repack.zip)  

按以下方式将本地资源引入到项目中，即可使用REPACK提供的基本样式和功能。

**其中[localPath]为资源在用户本地的路径。**

    # CSS
    <link rel="stylesheet" href="[localPath]/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="[localPath]/css/front.min.css">
    
    # JS
    <script src="[localPath]/js/jquery/jquery.min.js"></script>
    <script src="[localPath]/bootstrap/js/bootstrap.min.js"></script>
    <script src="[localPath]/js/common/front.min.js"></script>

###页面模版
REPACK最大的特点就是提供一系列页面模版，用户可在[页面模版页](http://repack.free4inno.com/layout)直接下载具体模板的代码包。

下载压缩包之后，将其解压缩到任意目录即可看到以下目录结构：

    [模板名称]
	├─[模板名称].html
	│  
	│  
	├─css
	│  ├─bootstrap.min.css
	│  └─front.css
	│      
	└─js
       ├─bootstrap.min.js
       ├─front.js
       └─jquery.min.js
        
**无需任何准备工作，直接打开相应的html文件即可使用该页面模版！**

css文件夹和js文件夹内提供的是页面模版能够正常工作必需的CSS和js文件。

用户可选择使用下载到本地的这些文件或使用在线css、js资源。

## 开发者
github上源码目录如下：

    REPACK
    ├─gulpfile.js
    ├─package.json
    │  
    ├─dist
    │  ├─bootstrap
    │  │          
    │  ├─css
    │  │          
    │  ├─js
    │  │          
    │  └─plugin
    │                  
    └─src
        └─dev 
            │          
            ├─bootstrap
            │                         
            ├─css
            │                          
            ├─img
            │              
            ├─js
            │                  
            ├─plugin
            │                      
            └─sass
          

 - dev文件夹中是REPACK的源码，其中sass文件夹内是未编译过的sass源码，css文件夹内为编译并合并过的样式文件。

 - dist文件夹内是编译压缩过的用于生产环境的CSS和js资源。

###编译项目
REPACK使用gulp作为编译系统，提供了一些用于编译源码的方法。

 - 安装gulp前，需要首先下载并安装node.js。
	
	Node.js的安装可以参考[Nodejs官网](https://nodejs.org/en/)


 - 安装工作流工具Gulp
    
   
       	 npm install gulp -g
    
 - 安装依赖


		npm install
    
 - 运行Web服务器，监测sass变化并自动刷新浏览器

   		 gulp
    
 - 本地的src/dev文件夹下为开发代码，开发完成后可以用下面的命令发布可用版本到dist 文件夹下

   		 gulp dist:build
    
 - 删除当前可用版本
	
  		  gulp clean:dist

###如何定制
REPACK提供4种皮肤供用户选择。

同时维护一个Sass配置表，目录为`src/dev/sass/_variables.scss`，用于配置网页的基本样式，方便用户自由定制。

    //默认样式
 	//页面
	$bodyColor: #e7e7e7 !default;
	$bodyFontColor: #333 !default;
	//---------------------------------------------------
	//链接颜色
	$alinkFontColor:#337ab7 !default;
	$alinkFontColor_Focus:#23527c !default;
	//---------------------------------------------------
	//导航栏
	$navbarColor: #f8f8f8 !default;
	$navBorderColor: #e7e7e7 !default;
	$navActiveColor: #3778bc !default;
	$navFontColor: #777 !default;
	$navFontHoverColor: #333 !default;
	$navbarImgUrl: '' !default;
	//打开下拉菜单的菜单项
	$navbarOpenColor:#e7e7e7 !default;
	$navbarOpenFontColor:#555 !default;
	………………
