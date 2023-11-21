# Webpack 知识汇总

## 一、工作流程

### 1、基本构建流程

#### 1.1、初始化参数

从配置文件和 `Shell` 命令中读取和合并参数，得多最终的配置 `config`

#### 1.2、开始编译

调用 `webpack` 函数接受 `config` 配置信息，并初始化 `complier` 对象, 加载配置的所有 `plugin`, 执行`complier.run` 方法进入模版编译阶段, 根据配置项 `entry` 确定入口文件

#### 1.3、编译模块

每一次新的编译都会实例化一个 `compilation` 对象，记录本次编译的基本信息。编译从入口文件出发：

- 调用合适的 `loader` 对模块进行处理，转换成标准的`js`模块

- 调用第三方插件`acorn`对标准`js`模块进行分析，收集模块依赖项，同时会递归每个依赖项，收集依赖项的依赖信息，如此往复，最终会得到一个依赖树

#### 1.4、完成编译模块

根据入口和模块的依赖关系，将多个模块组装成一个个 `chunk`, 再将每个 `chunk` 转化成一个单独的文件加入到**输出列表**（ ps: _这步是修改输出文件内容的最后机会_ ）

#### 1.5、输出完成

确定好输出内容后，按照配置确定输出的文件名和路径，把文件内容写入到文件系统中

::: tip
在上述整个过程中，`webpack` 会在特定的时间**广播**特定的事件( `hook`钩子函数 )，插件在监听到感兴趣的事件后会执行回调函数，利用 `webpack` 提供的 `api` 修改最后的输出结果
:::

### 2、核心概念

#### 2.1、compiler

编译器对象，其实例包含了完整的 `webpack` 配置，且全局只有一个 `compiler` 实例，相当于 `webpack` 的骨架或神经中枢，通过该对象可访问 `webpack` 内部环境

#### 2.2、compilation

`compilation` 对象代表了一次资源版本构建。当运行 `webpack` 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 `compilation`，从而生成一组新的编译资源

## 二、什么是 loader

`loader` 直译加载器。`Webpack` 将一切文件视为模块，但 `Webpack` 原生只支持解析 `JS`、`JSON` 文件，如果想打包其它文件，就需要使用的 `loader`, 所以说：

**`loader` 的作用是让 `webpack` 拥有了加载和解析非 `JS`、`JSON` 文件的能力**

### 3、开发中常见的 loader

**处理 `less/css`**

| loader                          | 作用                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| **less-loader**                 | 把 `less` 文件编译成 `CSS`                                   |
| **postcss-loader**              | 使用`PostCSS` 处理`CSS`，可配合`autoprefixer`加前缀          |
| **css-loader**                  | 处理 `url、@import` 等语法                                   |
| **style-loader**                | （`dev`）将`CSS`代码通过 `style` 标签以内联方式插入          |
| **MiniCssExtractPlugin.loader** | （`prod`）将`CSS`代码抽离成单独的 `CSS` 文件，有**缓存**作用 |

**处理图片、字体**

| loader          | 作用                                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **file-loader** | 把文件拷贝到一个文件夹，在代码中通过相对 `URL` 去引用文件内容，通过设置哈希来获得缓存                                               |
| **url-loader**  | 设置一个**阀值**，当文件大小小于阀值，以 `base64` 的方式把文件内容注入到代码中（减少`HTTP`请求）; 大于阀值，使用 `file-loader` 处理 |

**处理 JS**

| loader            | 作用                            |
| ----------------- | ------------------------------- |
| **eslint-loader** | 通过 `eslint` 检查 `JS` 代码    |
| **babel-loader**  | 将 `ES6+` 代码转化成 `ES5` 代码 |

**处理 Vue**

| loader         | 作用                                            |
| -------------- | ----------------------------------------------- |
| **vue-loader** | 允许使用**单文件组件**(SFCs)的格式撰写 vue 组件 |

**优化性能**
| loader | 作用 |
| -------- | ------- |
| **cache-loader** | 将 `loader` 的结果缓存到磁盘中，有效减少非首次构建时间 |
| **thread-loader** | `thread-loader` 之后的 `loader` 就会在一个单独的 `worker` 池中运行 |

### 4、loader 的工作原理

- `loader` 只是一个导出为**函数**的 JS 模块，`loader runner`会调用该函数，该函数接受文件资源或上一个 loader 的处理结果作为入参，多个 `loader` 可组成 `loader chain`

- `complier` 只需要最后一个 `loader` 的处理结果，结果应该是 `String` 或 `Buffer`

#### 4.1、`loader-runner`

一个执行 `loader chain` 的模块

#### 4.2、`loader`类型

`post`(后置) + `inline`(内联) + `normal`(普通) + `pre`(前置)

可通过 `enforce` 设置

#### 4.3、特殊配置

可通过设置以下特殊字符来忽略某种类型的 loader

| 符合     | 含义                                      |
| -------- | ----------------------------------------- |
| **`-!`** | `noPreAutoLoaders`, 不要前置和普通 loader |
| **`!`**  | `noAutoLoaders`, 不要普通 loader          |
| **`!!`** | `noPrePostAutoLoaders`, 只要内联 loader   |

#### 4.4、pitch

一个 `loader` 在内部是由 `loader` 和 `loader.pitch` 组成。

比如 `a!b!c!module`, loader 的调用顺序是 `c -> b -> a`, 但在处理`module`之前，其实执行了 `a(pitch) -> b(pitch) -> c(pitch)`, 如果其中任何一个 `pitching loader` 有返回值就相当于在它及右侧的 `loader` 都执行完毕了。

例如：`b(pitch)` 执行又返回值，接下来`c`不会被执行，只有 `a` 会被执行，并且 `a loader` 接受的参数是 `b(pitch)` 的返回值

![loader pitch](/images/webpack/loader-pitch.png)

### 5、如何手写 loader ？

::: tip 手写 `loader` 的思路

- `loader` 支持链式调用，所以需要严格遵循 “单一职责”， 每个 `loader` 只处理自己负责的事情

- `Webpack` 传给 `loader` 的原内容都是 `UTF-8` 格式编码的字符串，当某些场景下 `loader` 处理二进制文件时，需要通过 `exports.raw = true` 告诉 `Webpack` 该 `loader` 是否需要二进制数据

- 尽可能异步 `loader`

- `loader` 是无状态的，`loader` 内部不应该保留状态
  :::

## 三、什么是 plugin

`plugin` 直译 `插件`。用来扩展 `webpack` 的功能，让 `webpack` 更加灵活，在 `webpack` 生命周期中会**广播**出许多事件，`plugin` 可以监听这些事件，在合适的时机利用 `webpack` 提供的 `api` 修改打包结果

### 6、开发中常见的 plugin

| plugin                                 | 作用                                                        |
| -------------------------------------- | ----------------------------------------------------------- |
| **ModuleScopePlugin**                  | 限制所引入的文件范围                                        |
| **MiniCssExtractPlugin**               | 将`CSS`抽离成单独的文件                                     |
| **OptimizeCssAssetsPlugin**            | 对`CSS`代码进行压缩                                         |
| **SpeedMeasurePlugin**                 | 统计各个 `loader` 和插件所花费的时间                        |
| **TerserWebpackPlugin**                | `webpack` 默认使用 `terser` 来压缩 `JS`，可开启多进程       |
| **CleanWebpackPlugin**                 | 清除文件夹中内容                                            |
| **webpack.DefinePlugin**               | 定义环境变量，保证在`JS`中可获取                            |
| **webpack.HotModuleReplacementPlugin** | 模块热更新插件                                              |
| **webpack-bundle-analyzer**            | 借助 `webpack-bundle-analyzer` 可查看打包后每个包的体积较大 |

### 7、如何手写 plugin

`webpack plugin` 由以下部分组成

- `plugin` 通常是一个 `JS` 命名的函数，在其原型上存在 `apply` 方法

- `apply` 方法接收 `complier` 对象作为参数，在方法中注册 `webpack` 自身的事件钩子, 并添加回调方法

- 在回调方法中，可处理 `webpack` 的打包数据，处理结束后通过 `webpack` 自身的回调返回

```js
class DonePlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // 注册监听事件
    compiler.hooks.done.tapAsync('DonePlugin', (stats, callback) => {
      console.log('Hello ', this.options.name)
      callback()
    })
  }
}
module.exports = DonePlugin
```

当项目越来越大，`webpack` 的瓶颈就体现在两个方面，分别是：

- 构建过程耗时太长
- 打包产物体积太大

所以，webpack 的性能优化需要从这两个痛点下手

## 四、Webpack 优化策略

### 8、构建过程提速

#### 8.1、耗时分析

使用`SpeedMeasureWebpackPlugin` 插件可统计打包构建过程中每个 `loader`、`plugin` 所消耗的时间

```js
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const smw = new SpeedMeasureWebpackPlugin()
module.exports = smw.wrap({
  // config 配置
})
```

#### 8.2、缩小范围

- **extensions**: 指定 `extensions` 后导入文件不需要添加文件扩展名，`webpack` 会依次尝试添加扩展名进行尝试

- **alias**: 配置别名，可加快 `webpack` 查找模块速度

- **exclude / include**: 确保转译尽可能少的文件,
  `exclude`指定要排除的文件，`include` 指定要包含的文件，`exclude` 的优先级高于 `include`

- **external**: 当引入一个库，但又不想让 `webpack` 打包，并且不影响正常导入使用，可在 `external` 中进行配置

- **noParse**: `module.noParse ` 字段用于配置哪些模块文件的内容不需要进行解析，过滤的文件中不能使用 `import`, `require` 等语法

#### 8.3、利用缓存

利用缓存可以提升重复构建的速度

- **babel-loader**: `Babel` 在转译 JS 文件时性能消耗高，可将 `babel-loader` 执行的结果进行缓存，当重新打包时会尝试读取缓存。

  默认存放位置是 `node_modules/.cache/babel-loader`

  ```js
  {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
  ```

- **cache-loader**: 在一些性能开销大的 `loader` 之前添加 `cache-loader` ，可以将`loader`处理结果缓存到磁盘中

  默认保存在 `node_modules/.cache/cache-loader` 目录下

  ```js
  {
    test: /\.css$/,
    use: [
      'cache-loader',
      'logger-loader',
      'style-loader',
      'css-loader'
    ]
  }
  ```

- **hard-source-webpack-plugin** : 为模块提供中间缓存，节约第二次构建时间。（ `webpack5`中内置 ）

#### 8.4、多进程处理

- **`thread-loader`**: 放在其它 `loader` 之前，后置的 `loader` 就会在一个单独的 `worker` 池中运行

### 9、压缩打包体积

#### 9.1、体积分析

使用`webpack-bundle-analyzer` 插件可以可视化展示打包出的文件包含哪些，大小占比如何，模块包含关系，依赖项等等，有利于我们进行优化。

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [new BundleAnalyzerPlugin()]
}
```

#### 9.2、代码压缩

- JS 文件：`TenserWebpackPlugin` 插件
- CSS 文件：`OptimizeCssAssetsWebpackPlugin`
- Images：`image-webpack-loader` 对图片进行压缩和优化

#### 9.3、删除无用代码

- JS: `TreeShaking`, 没有使用到方法不会打进 `bundle` 里面，利用`es6` 模块的特点
- CSS: `PurgecssWebpackPlugin`

#### 9.4、代码分割

##### 9.4.1、入口点分割：`Entry Point`

```js
entry: {
  index: "./src/index.js",
  login: "./src/login.js"
}
```

**缺点**：

- 若两个入口 `chunk` 都引用了重复模块(`lodash`),那么重复模块会被引入到每个 `bundle` 中
- 不够灵活，不能对核心代码做进一步拆分

##### 9.4.2、动态导入和懒加载

**按需加载**：根据用户当前需要用什么功能就只加载该功能对应的代码

**拆分原则**:

- 按照网站功能(或路由)拆分，一类功能对应一个 `chunk`
- 首页需要的功能模块直接加载，展示给用户
- 被分割出去的代码需要一个按需加载的时机

都是使用 `import()` 关键字来实现的

##### 9.4.3、提取公共代码

**拆分准则**:

- 各种类库，适合长期存储
- 页面之间的公共代码
- 每个页面单独生成的文件

::: details splitChunks 配置参考

```js
splitChunks: {
  chunks: "all", //默认作用于异步chunk，值为 all/initial/async
  minSize: 0, //默认值是30kb,代码块的最小尺寸
  minChunks: 1, //被多少模块共享, 在分割之前模块的被引用次数
  maxAsyncRequests: 2, //限制异步模块内部的并行最大请求数的，可以理解为是每个import()它里面的最大并行请求数量
  maxInitialRequests: 4, //限制入口的拆分数量
  name: true, //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔开，如vendor~
  automaticNameDelimiter: "~", //默认webpack将会使用入口名和代码块的名称生成命名,比如 'vendors~main.js'
  cacheGroups: {
    //设置缓存组用来抽取满足不同规则的chunk,下面以生成common为例
    vendors: {
      chunks: "all",
      test: /node_modules/, //条件
      priority: -10, ///优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中,为了能够让自定义缓存组有更高的优先级(默认0),默认缓存组的priority属性为负值.
    },
    commons: {
      chunks: "all",
      minSize: 0, //最小提取字节数
      minChunks: 2, //最少被几个chunk引用
      priority: -20
    }
  }
}
```

:::

#### 9.5、设置 CDN

`CDN` 又叫内容分发网络，通过将资源部署到全球各地，用户在访问时按照就近原则从最近的服务器上下载资源，从而加速获取资源的速度

**缓存设置**：

- `HTML` 文件不设置缓存，放到自己服务器上
- 静态 `JS`、`CSS` 文件开启 `CDN` 和缓存，并且文件名带上 `hash` 值
- 为了并行不加塞，把不同资源的文件部署到不同的`CDN`服务器上
