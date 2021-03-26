# 翻译文档
集成翻译，自动翻译
## 思路
 1. 需要自动翻译的地方写成 __t('需要翻译的文字') 
	- .vue(html) {{ __t('需要翻译的文字') }}
	- .vue(js)   this.__t('需要翻译的文字')
	- .js        __t('需要翻译的文字')， 需要引入 'src/utils/t'
 2. 执行 npm run translate, 相关文件 unpackage/translate/index.js， 在package.json scripts中增加命令 "translate": "node ./unpackage/translate/index.js"
	- 遍历指定文件夹， 将__t('需要翻译的文字')提取，增加编号
	- __t('需要翻译的文字') 增加编号，替换成 __t('@1@需要翻译的文字')
	- 提取所有生成local/cn/cn.json文件
	- 然后遍历cn.json，执行翻译，生成local/cn/cn.json
## 相关代码
- unpackage/translate/index.js: 执行翻译文件
- src/mixins/global.js: 全局mixin, 添加__t方法, onShow: 翻译每个页面的标题， 需要在main.js中引入 Vue.mixin(globalMixin)
- src/local/index.js: changeTabbar(), 翻译tabbar
- src/utils/__t.js: 无法使用Vue的this的地方引用此方法翻译
## 注意:
 1. __t()中必须使用单引号
 2. 页面标题不适用自动翻译，需要自己翻译， 例如页面pages/mine/profile
    - local/cn/index.js写入和路径相对应的 { pages: { mine: { profile: '个人信息' } } }
	- src/mixins/global.js 会在onShow自动查找进行翻译
 3. tabbar翻译不适用自动翻译
	- local/cn/index.js写tabbar相关翻译: { tabbar: { 't0': '首页', 't1': '我的' } }
	- 在tabbar页面里指定src/local/index.js中的changeTabbar方法
 4. 打__t麻烦，在自己的编辑器中添加代码片段

## TODO:
 1. 增加自动扫描pages.json, 自动生成页面标题翻译文件，不再手动添加