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


##文档
### 快速开始 
[http://repack.free4inno.com/start](http://repack.free4inno.com/start)

**一份有关如何使用REPACK的指南和教程**，包括如下内容：

1. 如何在您的项目中使用REPACK

2. 如何使用REPACK提供的页面模版

3. 如何使用REPACK提供的4种主题

4. 如何利用gulp编译REPACK源码

5. 如何自己开发和定制主题

通过**快速开始**您可以在短时间内了解如何引入REPACK，以及如何使用REPACK提供的各项功能。

###页面模版
[http://repack.free4inno.com/layout](http://repack.free4inno.com/layout)

REPACK提供十余种页面模版，涵盖大部分应用场景。

在页面模版文档页我们提供模板信息、模板代码、模板截图以及下载包等内容。

###组件
[http://repack.free4inno.com/component](http://repack.free4inno.com/component)

REPACK提供功能丰富的基础组件，如表格、按钮组、分页……，用于快速构建页面。

###JS插件
[http://repack.free4inno.com/plugin](http://repack.free4inno.com/plugin)

在这里能够找到一系列用于完成复杂交互的JS插件，包括模态框、提示框、文件上传、图像上传、日期选择……

只需简单的代码即可为应用引入高级功能。

###辅助工具
[http://repack.free4inno.com/other](http://repack.free4inno.com/other)

REPACK还提供了一些常用的辅助样式与工具函数，主要用于优化用户体验。前者包括加载动画、转场动画等，工具函数则主要提供使用cookie和localStorage的接口。


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

