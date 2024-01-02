import{_ as t,o as e,c as a,Q as o}from"./chunks/framework.7b60570d.js";const d="/portal/assets/cacheType.ba691d12.png",r="/portal/assets/httpCache.2e7aebd2.png",f=JSON.parse('{"title":"前端缓存技术与方案解析","description":"","frontmatter":{},"headers":[],"relativePath":"notes/learn/feCache.md","lastUpdated":1704206502000}'),c={name:"notes/learn/feCache.md"},h=o('<h1 id="前端缓存技术与方案解析" tabindex="-1">前端缓存技术与方案解析 <a class="header-anchor" href="#前端缓存技术与方案解析" aria-label="Permalink to &quot;前端缓存技术与方案解析&quot;">​</a></h1><p>前端开发脱离不了网络和浏览器，前端缓存也可以直接看作是 <strong>HTTP 缓存</strong>和<strong>浏览器缓存</strong>的结合，两者是相辅相成的关系</p><h2 id="一、缓存分类" tabindex="-1">一、缓存分类 <a class="header-anchor" href="#一、缓存分类" aria-label="Permalink to &quot;一、缓存分类&quot;">​</a></h2><p><img src="'+d+'" alt=""></p><h2 id="二、http-缓存" tabindex="-1">二、HTTP 缓存 <a class="header-anchor" href="#二、http-缓存" aria-label="Permalink to &quot;二、HTTP 缓存&quot;">​</a></h2><p><img src="'+r+'" alt=""></p><h3 id="_2-1、注意点" tabindex="-1">2.1、注意点： <a class="header-anchor" href="#_2-1、注意点" aria-label="Permalink to &quot;2.1、注意点：&quot;">​</a></h3><ol><li><p>当使用 <code>s-maxage</code> 指令后，公共缓存服务器将直接忽略 <code>Expires</code> 和 <code>max-age</code> 指令的值</p></li><li><p>当设置了 <code>private</code> 指令后 <code>s-maxage</code> 指令将被忽略。代理服务器也不会进行缓存</p></li><li><p><code>no-cache</code>、<code>no-store</code> 这两个指令在请求和响应中都可以使用</p><ul><li>当 <code>no-cache</code> 在 <strong>请求首部</strong> 中被使用时，表示告知（代理）服务器不直接使用缓存，要求向源服务器发起请求</li></ul></li></ol><h3 id="_2-2、http-缓存方案" tabindex="-1">2.2、HTTP 缓存方案 <a class="header-anchor" href="#_2-2、http-缓存方案" aria-label="Permalink to &quot;2.2、HTTP 缓存方案&quot;">​</a></h3><ul><li>频繁变动的资源，比如 HTML， 采用协商缓存</li><li>CSS、JS、图片资源等采用强缓存，使用 hash 命名</li></ul><p>Webpack 中 hash 可以分为三种类型：<code>hash</code>、<code>chunkhash</code>、<code>contenthash</code>，区分如下</p><table><thead><tr><th>类型</th><th>介绍</th><th>优缺点</th></tr></thead><tbody><tr><td>hash</td><td>项目级别的 hash，所有文件也都共用该 hash 值</td><td>改一处动全身，浪费资源</td></tr><tr><td>chunkhash</td><td>入口文件级别的 hash，会根据入口文件（entry）的依赖进行打包</td><td>推荐打包公共模块</td></tr><tr><td>contenthash</td><td>文件内容级别的 hash，根据文件内容的变化而变化</td><td></td></tr></tbody></table><p>注意项</p><ul><li>当在 <code>module</code> 中使用 <code>loader</code> 设置图片或者字体的文件名时，如包含 <code>hash</code> 或 <code>chunkhash</code> 都是不生效的，默认会使用 <code>contenthash</code></li><li>将 <code>chunkhash</code> 和 <code>contenthash</code> 组合使用才能最大化的利用 <code>HTTP</code> 缓存中强缓存的优势，减少不必要的资源重复请求，提升网页的整体打开速度</li></ul><h2 id="三、用户操作与-http-缓存" tabindex="-1">三、用户操作与 HTTP 缓存 <a class="header-anchor" href="#三、用户操作与-http-缓存" aria-label="Permalink to &quot;三、用户操作与 HTTP 缓存&quot;">​</a></h2><p>Chrome 的三种加载模式</p><ul><li>正常重新加载</li><li>硬性重新加载</li><li>清空缓存并硬性重新加载</li></ul><p>的区别</p><table><thead><tr><th>加载模式</th><th>快捷键</th><th>特点</th></tr></thead><tbody><tr><td>正常重新加载</td><td><code>Ctrl + R</code>（等同于直接按 F5）</td><td>会优先读取缓存</td></tr><tr><td>硬性重新加载</td><td><code>Ctrl + Shift + R</code>（等同于直接按 <code>Ctrl + F5</code>）</td><td>使用硬性重新加载后所有资源的请求首部都被加上了 <code>cache-control: no-cache</code> 和 <code>pragma: no-cache</code>，两者的作用都表示告知（代理）服务器不直接使用缓存，要求向源服务器发起请求，而 <code>pragma</code> 则是为了兼容 HTTP/1.0。<strong>硬性重新加载并没有清空缓存，而是禁用缓存</strong></td></tr><tr><td>清空缓存并硬性重新加载</td><td>/</td><td><strong>会将浏览器存储的本地缓存都清空掉后再重新向服务器发送请求</strong>，同时其影响的并不是当前网站，所有访问过的网站缓存都将被清除</td></tr></tbody></table><p>注意项</p><ul><li>三种模式只有在打开控制台后，浏览器左上角才会出现</li><li>资源异步加载命中缓存不受硬性重新加载控制 <ul><li>在 DOM 渲染好后，异步插入的资源在 硬性重新加载 后，还是会命中缓存</li></ul></li><li>针对 <code>base64</code> 图片，不管是首次加载还是清空缓存，始终会命中缓存（<code>from memory cache</code>）</li></ul><h2 id="四、浏览器缓存" tabindex="-1">四、浏览器缓存 <a class="header-anchor" href="#四、浏览器缓存" aria-label="Permalink to &quot;四、浏览器缓存&quot;">​</a></h2><table><thead><tr><th>类别</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td>Memory Cache</td><td>获取速度快、优先级高</td><td>生命周期短，当网页关闭后内存就会释放；大小受限</td></tr><tr><td>Disk Cache</td><td>生命周期长，不触发删除操作则一直存在</td><td>获取资源的速度相对较慢</td></tr></tbody></table><ul><li>缓存读取优先级：内存 &gt; 磁盘 &gt; 网络请求</li></ul><h3 id="_4-1-preload-与-prefetch-对缓存的影响" tabindex="-1">4.1 Preload 与 Prefetch 对缓存的影响 <a class="header-anchor" href="#_4-1-preload-与-prefetch-对缓存的影响" aria-label="Permalink to &quot;4.1 Preload 与 Prefetch 对缓存的影响&quot;">​</a></h3><ul><li><p><code>preload</code> 也被称为预加载，其用于 <code>link</code> 标签中，可以指明哪些资源是在页面加载完成后即刻需要的，浏览器会在<strong>主渲染机制介入前</strong>预先加载这些资源，并不阻塞页面的初步渲染。</p></li><li><p>当使用 <code>preload</code> 预加载资源会保持在<strong>磁盘缓存</strong>中，因为在渲染机制还没有介入前的资源加载不会被内存缓存</p></li><li><p><code>prefetch</code> 则表示预提取，告诉浏览器加载下一页面可能会用到的资源，浏览器会利用空闲状态进行下载并将资源存储到缓存中</p></li><li><p>使用 <code>prefetch</code> 加载的资源，刷新页面时大概率会从磁盘缓存中读取，如果跳转到使用它的页面，则直接会从磁盘中加载该资源</p></li></ul><h2 id="五、相关信息" tabindex="-1">五、相关信息 <a class="header-anchor" href="#五、相关信息" aria-label="Permalink to &quot;五、相关信息&quot;">​</a></h2><ul><li><a href="https://juejin.cn/book/6994678547826606095?enter_from=course_center" target="_blank" rel="noreferrer">前端缓存技术与方案解析-劳卜</a></li></ul>',28),l=[h];function i(n,s,p,u,_,b){return e(),a("div",null,l)}const g=t(c,[["render",i]]);export{f as __pageData,g as default};
