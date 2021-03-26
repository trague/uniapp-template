# UNI-APP项目模板
======================================

## 代码相关
- 全局样式代码: src/App.vue中引入全局样式
- 全局api: 全局的jsapi均在main.js中引入，挂载到Vue中，谨慎增加全局API
- [重要]全局mixins: src/golbal.js
- 字体图标使用iconfont: unpackage/doc/iconfont
## 重要说明
- 更改开发环境和生产环境： 更改src/constants/index.js中的HOST值，具体在注释中
- 更改H5端开发时的重写URL: 更改manifest.json->h5->devServer

### 文档
## 文档、功能说明
- [请求方法](unpackage/doc/request.md)
- [APP更新](unpackage/doc/upgrade.md)
- [自动翻译](unpackage/doc/translate.md)
- [全局toast功能](unpackage/doc/toast.md)
- [复制功能](unpackage/doc/copy.md)
- [生成二维码功能](unpackage/doc/qr.md)
- [启动图变形处理](unpackage/doc/splash.md)
### TODO
- [记住密码](unpackage/doc/remember-password.md)
- [启动动画](unpackage/doc/remember-password.md)
- 登录退出流程、用户信息存储更新
- 在线客服
- 上传图片
- 分享海报保存
- 保存相册
- 基础组件说明文档: unpackage/doc/components.md
- K线
- 关系结构图
- tabbar拦截