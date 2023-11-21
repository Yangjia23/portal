---
outline: 2
---

# PC 踩坑记录

## `transform` 导致字体不清晰

`transform` 在**渲染非整数的 `px` 时**就会出现字体模糊

#### 解决方法

```css
/* 方案一 */
目标元素 {
  -webkit-font-smoothing: antialiased;
}

/* 方案二 */
目标元素 {
  transform: perspective(1px);
}
```

[详细说明 CSS-TRACKS](https://css-tricks.com/forums/topic/transforms-cause-font-smoothing-weirdness-in-webkit/)
