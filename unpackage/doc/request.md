# 请求方法
==========================
### 单独写请求方法是为了能够全局处理一些事情

### 功能
- 请求的时候统一挂载了useid和sessionid, 如果用的是token，就去utils/request.js中修改
- status=9的时候，自动跳转登录
- get请求: this.$get('/api/getList', payload)
- post请求: this.$post('/api/login', payload)
- 中断请求: const { status } = await abort(this.getList, this.$post('/api/login', payload))

### 相关
- utils/request.js
- main.js Vue上挂载 $post、$get方法

### 建议
- 之前我是把api独立到src/api文件夹下，但是在项目后续维护的时候这种方式并不好维护，功能删除的时候api容易被遗留，会越来越多，同时因为绝大部分api只是用一次，所以建议把api就写在执行请求的方法里，除非有重复使用的地方
