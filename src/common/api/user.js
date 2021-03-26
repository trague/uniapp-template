import { request } from '@/utils/request.js';

// 登录
export const api_login = payload => request('/api/login/login', payload)

export const api_getUserInfo = (other) => request({
	url: '/api/login/login',
	methods: 'POST',
	...other
})

export const api_registerPage = payload => request('/api/webmember/register', payload)

export const api_registerSave = payload => request('/api/webmember/registersave', payload)

export const api_logout =  payload => request('/api/login/logout', payload)

export const api_forgetPassByMobile =  payload => request('/api/login/forgetPassSave', payload)

