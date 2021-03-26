
import {request} from '@/utils/request.js';
// 获取图片验证码
export const api_imageVCode = payload => request('/api/login/getVerifyCode', payload)