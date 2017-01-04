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




## 开发者
github上源码目录如下：

    REPACK
    ├─gulpfile.js
    ├─package.json
    │  
    ├─dist			//静态资源目录
    │  ├─bootstrap	//静态资源bootstrap文件
    │  │          
    │  ├─css		//静态资源css文件
    │  │          
    │  ├─js			//静态资源js文件
    │  │          
    │  └─plugin		//静态资源插件文件
    │                  
    └─src
        └─dev 		//实际进行开发的目录
            │          
            ├─bootstrap
            │                         
            ├─css	//sass编译成的css文件
            │                          
            ├─img	//项目相关图片文件
            │              
            ├─js	//js文件
            │                  
            ├─plugin//插件文件	
            │                      
            └─sass	//项目相关sass文件
          

 - dev目录是REPACK的源码，其中sass文件夹内是未编译过的sass源码，css文件夹内为编译并合并过的样式文件。

 - dist目录是编译压缩过的用于生产环境的CSS和js资源。

###编译项目
REPACK使用Sass进行CSS的开发，并使用gulp作为编译系统，提供了一些用于编译源码的方法。

 - 安装gulp前，需要首先下载并安装node.js。
	
	Node.js的安装可以参考[Nodejs官网](https://nodejs.org/en/)


 - 安装工作流工具Gulp
    
   
       	npm install gulp -g
    
 - 安装项目所需依赖


		npm install
    
 - 编译Sass，合并js，生成开发环境下的静态资源

   		 gulp
    
 - 开发完成后发布可用版本到dist目录

   		 gulp dist:build
    
 - 删除当前可用版本
	
  		  gulp clean:dist

