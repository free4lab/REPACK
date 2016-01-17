# Flexible-Front-Frameware
free4lab new front

![FrontLab](http://ww4.sinaimg.cn/large/006hTL6Wjw1eyrbd6lqs9j313q0mnq5t.jpg)

## 示例 demo
之前版本 previous version [http://newfront.free4inno.com/](http://newfront.free4inno.com/)

正在开发 developing version  [http://f3.free4lab.com/](http://f3.free4lab.com/)

## 快速使用 Quick Start Use
### 引用在线资源 reference online resources

    # CSS
    <link rel="stylesheet" href="http://newfront.free4inno.com/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://newfront.free4inno.com/css/front.css">
    
    # JS
    <script src="http://newfront.free4inno.com/js/jquery/jquery.min.js"></script>
    <script src="http://newfront.free4inno.com/bootstrap/js/bootstrap.min.js"></script>
    <script src="http://newfront.free4inno.com/js/plugin/front.js"></script>
    
### 引用本地资源 reference local resources

Clone

    git clone https://github.com/free4lab/Flexible-Front-Frameware.git
    
or

    Download Zip

then

    # CSS
    <link rel="stylesheet" href="[localPath]/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="[localPath]/css/front.min.css">
    
    # JS
    <script src="[localPath]/js/jquery/jquery.min.js"></script>
    <script src="[localPath]/bootstrap/js/bootstrap.min.js"></script>
    <script src="[localPath]/js/common/front.min.js"></script>

## 开发者安装 Developer Install (from git)

Install Node.js

Clone 

    git clone https://github.com/free4lab/Flexible-Front-Frameware.git

Switch to develop branch

    git checkout -b develop origin/develop
    
Install Workflow Tool *Gulp*
    
    npm install gulp -g
    
Install Dependency

    npm install
    
Run WebServer

    gulp
    
Release

    gulp dist:build
    
Clean

    gulp clean