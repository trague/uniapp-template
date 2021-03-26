# 全局toast
## 因为uniapp不能获取dom，所以全局的toast比较麻烦，此处说明的实现只是一种方式

### 实现思路
每个页面必须使用一个组件(ba-root)作为根元素，然后元素中监听一个唯一的事件, 使用toast的时候触发这个事件，根元素就会显示一个toast

### 相关文件
- components/ba-root: 页面根元素，每个页面必须使用
- components/ba-toast: ba-root引入，用来显示toast
- components/ba-toast/toast.js: 实现toast方法，每个页面监听改一个事件
- main.js 把toast方法挂载到 Vue上

### 使用
- Vue:  this.$toast(参数)
- js:   import toast from 'components/ba-toast/toast.js'  toast()

### TODO
- 实现toast.success和toast.error的区分
- toast动画优化