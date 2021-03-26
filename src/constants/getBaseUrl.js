/**
 * 基础路径
 * 只在 constants/index.js中引入
 * 注意: api填写路径时要在前面添加 '/'
 */

export function getBaseUrl({ DEV_URL, PRODUCT_URL, env = 'PRODUCT' }) {
  let BASE_URL = env === 'DEV' ? DEV_URL : PRODUCT_URL

  // 非H5的开发环境
  // #ifndef H5
  if (process.env.NODE_ENV === 'development') {
    // APP端测试环境下的域名
    BASE_URL = DEV_HOST
  }
  // #endif

  // #ifdef H5
  if (process.env.NODE_ENV === 'development') {
    // H5测试环境设置空，使用devserver配置测试站，
    BASE_URL = '/dev_server'
  } else {
    // 打包后的H5用空字符串,自适应域名
    BASE_URL = ''
  }
  // #endif

  return BASE_URL
}
