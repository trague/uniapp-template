import { getBaseUrl } from './getBaseUrl'

// 测试域名
const DEV_URL = ''
// 正式域名
const PRODUCT_URL = ''

// 正式站,
export const BASE_URL = getBaseUrl({
  DEV_URL,
  PRODUCT_URL,
})


// 上传域名
export const UPLOAD_IMAGE_URL = BASE_URL + '/api/Uploadfile/uploads'

// 是否是测试包
export const IS_DEV_PACKAGE = true
