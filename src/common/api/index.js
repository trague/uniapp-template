import {request} from '@/utils/request.js';

// 切换多语言
export const api_changeLanguage = payload => request('/api/Login/language', payload)

// 获取APP版本，检查APP更新
export const api_getVersion = payload => request('/api/login/getversion', payload)

// 获取用户信息
export const api_getUserInfo = payload => request('/api/member/memberInfos', payload)

// 获取图片验证码
export const api_imageVCode = payload => request('/api/login/getVerifyCode', payload)

// 获取公告列表
export const api_noticeList = payload => request('/api/notice/notice', payload)
