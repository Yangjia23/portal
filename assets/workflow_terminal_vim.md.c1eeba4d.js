import{_ as t,o as d,c as e,Q as a}from"./chunks/framework.7b60570d.js";const r="/portal/images/linux/vikey.jpeg",p=JSON.parse('{"title":"Vim 命令","description":"","frontmatter":{},"headers":[],"relativePath":"workflow/terminal/vim.md","lastUpdated":1704206502000}'),o={name:"workflow/terminal/vim.md"},l=a('<h1 id="vim-命令" tabindex="-1">Vim 命令 <a class="header-anchor" href="#vim-命令" aria-label="Permalink to &quot;Vim 命令&quot;">​</a></h1><blockquote><p>想要在服务器上玩的溜，掌握常见的 <code>Vim</code> 命令必不可少</p></blockquote><h2 id="一、操作模式" tabindex="-1">一、操作模式 <a class="header-anchor" href="#一、操作模式" aria-label="Permalink to &quot;一、操作模式&quot;">​</a></h2><table><thead><tr><th>模式名</th><th>含义</th></tr></thead><tbody><tr><td>命令模式</td><td>等待命令输入</td></tr><tr><td>输入模式</td><td>编辑模式，用于输入文本</td></tr><tr><td>底行(尾行、末行)模式</td><td>可以输入指令，搜索，保存</td></tr></tbody></table><h2 id="二、底行模式" tabindex="-1">二、底行模式 <a class="header-anchor" href="#二、底行模式" aria-label="Permalink to &quot;二、底行模式&quot;">​</a></h2><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>:w</code></td><td>把写入保存到硬盘中</td></tr><tr><td><code>:q</code></td><td>退出</td></tr><tr><td><code>:wq!</code></td><td>强制保存退出</td></tr></tbody></table><h2 id="三、命令模式" tabindex="-1">三、命令模式 <a class="header-anchor" href="#三、命令模式" aria-label="Permalink to &quot;三、命令模式&quot;">​</a></h2><h3 id="_3-1、移动类" tabindex="-1">3.1、移动类 <a class="header-anchor" href="#_3-1、移动类" aria-label="Permalink to &quot;3.1、移动类&quot;">​</a></h3><ul><li>光标移动</li></ul><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>h</code></td><td>光标左移 👈</td></tr><tr><td><code>j</code></td><td>光标上移 👆</td></tr><tr><td><code>k</code></td><td>光标下移 👇</td></tr><tr><td><code>l</code></td><td>光标右移 👉</td></tr></tbody></table><ul><li>计数指定动作</li></ul><table><thead><tr><th>命令</th><th>含义</th><th>示例</th></tr></thead><tbody><tr><td><code>{n}w</code></td><td>光标向前移动<code>{n}</code>个单词</td><td>2w, 光标向前移动两个单词</td></tr><tr><td><code>{n}e</code></td><td>光标向前移动到第<code>{n}</code>个单词的末尾</td><td>3e, 光标向前移动到第三个单词的末尾</td></tr><tr><td><code>0</code></td><td>移动光标到行首</td><td></td></tr></tbody></table><h3 id="_3-2、翻页" tabindex="-1">3.2、翻页 <a class="header-anchor" href="#_3-2、翻页" aria-label="Permalink to &quot;3.2、翻页&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>ctrl+f</code></td><td>向下翻页</td></tr><tr><td><code>ctrl+b</code></td><td>向上翻页</td></tr><tr><td><code>ctrl+d</code></td><td>向下翻半页</td></tr><tr><td><code>ctrl+u</code></td><td>向上翻半页</td></tr></tbody></table><h3 id="_3-3、插入类" tabindex="-1">3.3、插入类 <a class="header-anchor" href="#_3-3、插入类" aria-label="Permalink to &quot;3.3、插入类&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>i</code></td><td>在当前光标位置插入</td></tr><tr><td><code>a</code></td><td>在当前光标<strong>右边</strong>插入</td></tr><tr><td><code>A</code></td><td>在当前光标<strong>行末</strong>插入</td></tr><tr><td><code>o</code></td><td>在光标所在行的下方插入一行并切换到输入模式</td></tr><tr><td><code>O</code></td><td>在光标所在行的上方插入一行并切换到输入模式</td></tr><tr><td><code>s</code></td><td>删除当前光标位置并插入</td></tr></tbody></table><h3 id="_3-4、删除类" tabindex="-1">3.4、删除类 <a class="header-anchor" href="#_3-4、删除类" aria-label="Permalink to &quot;3.4、删除类&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>x</code></td><td>删除光标所在字符</td></tr><tr><td><code>dw</code></td><td>删除光标所在单词,光标需放置到删除单词的起始处</td></tr><tr><td><code>d$</code></td><td>从光标处删至当前行尾部</td></tr><tr><td><code>dd</code></td><td>删除光标所在行</td></tr></tbody></table><h3 id="_3-5、替换类" tabindex="-1">3.5、替换类 <a class="header-anchor" href="#_3-5、替换类" aria-label="Permalink to &quot;3.5、替换类&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>yy</code></td><td>复杂光标所在行</td></tr><tr><td><code>p</code></td><td>在光标所在行的下方粘贴</td></tr><tr><td><code>P</code></td><td>在光标所在行的上方粘贴</td></tr></tbody></table><h3 id="_3-6、撤销" tabindex="-1">3.6、撤销 <a class="header-anchor" href="#_3-6、撤销" aria-label="Permalink to &quot;3.6、撤销&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>u</code></td><td>撤消最后执行的一次命令</td></tr></tbody></table><h3 id="_3-7、搜索" tabindex="-1">3.7、搜索 <a class="header-anchor" href="#_3-7、搜索" aria-label="Permalink to &quot;3.7、搜索&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>/</code></td><td>输入/可以在当前的文件中查找该字符串</td></tr><tr><td><code>n</code></td><td>查找下一个</td></tr><tr><td><code>shift+n</code></td><td>查找上一个</td></tr></tbody></table><h3 id="_3-8、修正" tabindex="-1">3.8、修正 <a class="header-anchor" href="#_3-8、修正" aria-label="Permalink to &quot;3.8、修正&quot;">​</a></h3><table><thead><tr><th>命令</th><th>含义</th></tr></thead><tbody><tr><td><code>:s/old/new</code></td><td>把光标所在行的 old 替换成 new</td></tr><tr><td><code>:s/old/new/g</code></td><td>把所有行的 old 替换成 new</td></tr></tbody></table><h2 id="四、资料" tabindex="-1">四、资料 <a class="header-anchor" href="#四、资料" aria-label="Permalink to &quot;四、资料&quot;">​</a></h2><ul><li>键位图 <img src="'+r+`" alt="Vim键位图"></li><li>官方教程</li></ul><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 在命令行中直接输入</span></span>
<span class="line"><span style="color:#FFCB6B;">vimtutor</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,29),h=[l];function c(i,n,s,b,u,_){return d(),e("div",null,h)}const q=t(o,[["render",c]]);export{p as __pageData,q as default};
