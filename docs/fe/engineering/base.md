# 模块化规范

> 前端模块化如何一步一步 “进化”

## 一、“伪模块化”

### 1.1、全局 `function` 格式

**说明：** 将不同的功能封装到不同的全局函数中

**代码实现:**

```js
function m1() {
  //...
}
function m2() {
  //...
}
```

**缺点:**

- 全局命名空间污染，容易造成命名冲突、数据不安全
- 模块之间看不出依赖关系

### 1.2、`namesapce` 格式

**说明：** 相比于全局 `function`，减少了全局变量，解决命名冲突

**代码实现:**

```js
let myModule = {
  name: 'Hello',
  getName: () => {}
}
```

**缺点:**

- 数据不安全，外面可之间修改模块内部的数据

### 1.3、`IIEF` 格式

**说明：**

- 匿名函数自执行调用，数据是私有的，只能通过暴露出去的方法操作
- 依赖的其它模块通过参数注入

**代码实现:**

```js
;(function (window, $) {
  let data = 'www.baidu.com' //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
    $('body').css('background', 'red')
  }
  //暴露方法
  window.myModule = { foo }
})(window, jQuery)
```

## 二、CommonJS 规范

**说明:**

1、每个文件都是一个模块，存在模块作用域，文件内部定义的变量、函数都是私有的

2、模块可多次加载，但**只在首次加载时会运行一次**，并将**执行结果**进行缓存，后续再次加载直接读取缓存结果

3、模块加载的顺序，按照其在代码中出现的顺序

4、模块加载机制是**值拷贝**，模块一旦输出个值，后续模块内部改变都影响不了这个值

**语法**

- 导出: `module.exports / exports`
- 导入: `require`

说明:

1、每个模块内部，`module` 变量代表当前模块，其 `exports` 属性代表模块对外输出接

2、加载某个模块，就是加载该模块的 `module.exports` 属性

**实现**

- 服务端实现: 借助 `node.js` 特性

- 浏览器端实现: 借助 `Browserify`
- 区分:

  服务端，文件都存储在硬盘中，可实时读取，动态加载模块

  使用 `Browserify` 在编译阶段就会打包 `require`

**优缺点**

- 借助 `node.js` 特性，可以实现按需加载，但无法实现 `tree-shaking`
- `if (true) { require('xxx')}`

## 三、AMD 规范

**说明**

1、`AMD` 规则支持**异步加载**模块，在浏览器环境，需要从服务端获取文件，所以必须支持异步，所以浏览器一般采用 `AMD` 规范

**语法**

- 定义无依赖模块:
  ```js
  define(function () {
    return 模块
  })
  ```
- 定义依赖模块:
  ```js
  define(['module1'], function (m1, m2) {
    return 模块
  })
  ```
- 导入模块:
  ```js
  require(['module1', 'module2'], function (m1, m2) {
    // 使用 m1/m2
  })
  ```
  **实现**
- `require.js` 工具库
- 通过 `define` 方法，将代码定义为模块
- 通过 `require` 方法，实现代码的模块加载

**优点**

- 可以用于浏览器环境，并且允许非同步加载模块，
- 也可以根据需要**动态加载**模块

## 四、CMD 规范

**说明**

CMD 规范整合了 CommonJS 和 AMD 规范的特点，模块的加载是异步的，模块使用时才会加载执行

**语法**

- 使用 `define` 定义模块
- 使用 `require` 同步引入, `require.async` 异步引入依赖的模块
- 使用 `module.exports` 或 `exports` 导出模块

**实现**

**Sea.js**

```js
//定义有依赖的模块
define(function (require, exports, module) {
  //引入依赖模块(同步)
  var module2 = require('./module2')

  //引入依赖模块(异步)
  require.async('./module3', function (m3) {})

  //暴露模块
  exports.xxx = value
})
```

## 五、UMD 规范

**说明**

提供一个前后端跨平台的解决方案(支持`AMD`与`CommonJS`模块方式)

**语法**

1、先判断是否支持`Node.js`模块格式（`exports`是否存在），存在则使用`Node.js`模块格式

2、再判断是否支持`AMD`（`define`是否存在），存在则使用`AMD`方式加载模块

3、前两个都不存在，则将模块公开到全局（`window`或`global`）

## 六、ES 模块化规范

**说明**

1、`ES` 模块化的设计思想在于**静态化**，在编译时就能确定模块的依赖关系，以及输入和输出的变量

2、利用静态化的思想，有利于做 `tree-shaking` 优化，减少代码打包体检

3、`ES6` 模块输出的是值的引用，并不会缓存值

**语法**

- 使用 `export / export default` 导出模块
- 使用 `import` 导入

**其它**

1、`export / export default` 的区别

- `export` (推荐): 在导入时需要知道模块的导出内容，利于 `tree-shaking`

- `export default`, 将模块作为整体进行导出，在导入时可以重命名

## 七、区别

> ES6 模块与 CommonJS 模块的差异?

- `CommonJS` 模块输出的是一个值的拷贝，`ES6` 模块输出的是值的
  引用

  ```js
  // lib.js
  export let counter = 3
  export function incCounter() {
    counter++
  }
  // main.js
  import { counter, incCounter } from './lib'
  console.log(counter) // 3
  incCounter()
  console.log(counter) // 4
  ```

  ES6 模块是 **动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块**。

- `CommonJS` 模块是运行时加载，`ES6` 模块是编译时输出接口

  `CommonJS` 加载的是一个对象（即`module.exports`属性），该对象只有在脚本运行完才会生成。而 `ES6` 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成
