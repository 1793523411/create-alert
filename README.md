# 快速开始

**[文档地址](http://alert-doc.ygjie.icu/)**

## 功能介绍

该脚手架可以让你快速开发出一个消息提醒的应用，其中内置的模板如下：

1. 一个课程提醒应用，会在你指定的时间通过钉钉机器人提醒你，该模板使用eggjs开发，更多使用： [课程提醒](http://alert-doc.ygjie.icu/pages/02.html#alert-%E8%AF%BE%E7%A8%8B%E6%8F%90%E9%86%92%E6%A8%A1%E6%9D%BF)
2. 一个简单的消息提醒应用，包括 qq的email,钉钉机器人，企业微信机器人，通过自己定义的消息数据，和设置提醒时间，实现定期发送消息，更多使用： [消息订阅](http://alert-doc.ygjie.icu/pages/03.html#%E6%B6%88%E6%81%AF%E8%AE%A2%E9%98%85)

## 安装

使用`npm`全局安装

```
npm install create-alert -g
```
## 创建一个应用

如果你已经全局安装了该工具，可以执行以下命令来创建一个应用

```
npm init <项目名>
```

如果你没有全局安装该工具，可以通过如下命令来创建一个应用

```
npx create-alert init <项目名>

或

npm init alert init <项目名>
```

## 启动项目

开发环境下:

```
npm run dev

或

yarn dev
```
生产环境请查看:[部署](http://alert-doc.ygjie.icu/pages/05.html)

## 目录结构

模板采用的及web框架为eggjs，目录结构遵循eggjs的目录结构以及eggjs的一些规则

[eggjs官网](https://eggjs.org/zh-cn/)

## 更多使用

```
create-alert -v 查看版本
create-alert mirror <镜像源地址> 设置镜像源
create-alert upgrade 查看更新
```

::: tip 
有关设置镜像源相关的信息请查看:[自定义模板](http://alert-doc.ygjie.icu/pages/04.html)
:::