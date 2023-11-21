---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 前端壹甲壹
  text: Focus on Yourself!
  tagline: 「离开世界之前 一切都是过程」
  image:
    src: /logo.png
    alt: 前端壹甲壹
  actions:
    - text: 前端物语
      link: /fe/es6/
    - text: 前端导航
      link: /nav
      theme: alt
    - text: mmPlayer
      link: https://netease-music.fe-mm.com
      theme: alt
features:
  - icon: 📖
    title: 前端物语
    details: 打造前端图谱<br/>从面到块再到点展开知识点，避免死记硬背
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 📘
    title: 源码阅读
    details: 知其所以然<br />深入源码了解框架背后的架构设计、核心原理
    link: /analysis/utils/only-allow
    linkText: 源码阅读
  - icon: 💡
    title: Workflow
    details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的提效
    link: /workflow/utils/library
    linkText: 常用工具库
  - icon: 🐞
    title: 笔记
    details: 那些年我们踩过的坑<br />总有一些让你意想不到的问题
    link: /pit/npm
    linkText: 踩坑记录
  - icon: 🧰
    title: 提效工具
    details: 工欲善其事，必先利其器<br />记录开发和日常使用中所用到的软件、插件、扩展等
    link: /efficiency/online-tools
    linkText: 提效工具
  - icon: 💯
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">一个不给自己设限的开发</small>'
    link: https://fe-mm.com
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .item:last-child .details {
  display: flex;
  justify-content: flex-end;
  align-items: end;
}
</style>
