import { BASE_URL } from '@/constants/index.js';
import store from '@/store/index.js'
import get from 'lodash.get'


/**
 * 未登录的处理函数
 */
export const unLoginHandler = () => {
	store.commit('app/LOGOUT')
	uni.reLaunch({
		url: '/pages/login/login'
	})
}

/**
 * 简单的请求方法，基本的get、post请求都可以使用此方法，如果设计都到其他，则进行特别处理
 */
export const request = (options, data = {}, method = 'POST') => {
	let url = ''
	if (typeof options === 'object') {
		data = options.data || {}
		method = options.method
		url = options.url
	} else if (typeof options === 'string') {
		url = options
		options = {}
	}
	
	const config = {
		// 是否处理未登录情况，默认处理，跳转登录页
		unloginHandle: options.__unloginHandle === false ? false : true,
		// 是否在请求中添加用户信息
		addToken: options.__addToken === false ? false : true,
	}
	
	// 在请求中添加用户信息
	if (config.addToken) {
		const sessionid = store.getters.userinfo.sessionid
		sessionid && (data.sessionid = sessionid)
		if (!data.userid) {
			const userid = store.getters.userinfo.id
			userid && (data.userid = userid)
		}
	}
	
	const header = options.header || { 
		'content-type': 'application/json'
	}

	let abort = null
	let isAbort = false

	// console.log('参数:', data)
	const promise = new Promise((resolve, reject) => {
		let task = uni.request({
			url: BASE_URL + url,
			header,
			method,
			data,
			success: response => {
				const { statusCode } = response;

				if (statusCode === 200) {
					const result = response.data
					if (result.status === 9) {
						if (config.unloginHandle) {
							unLoginHandler()
						}
					} else {
						resolve(result)
					}
				} else {
					reject({
						type: 'http',
						message: '请求错误, 错误码' + statusCode
					})
				}
			},
			fail: err => {
				if (isAbort) {
					isAbort = null
					task = null
					reject({
						type: 'abort',
						message: err.errMsg
					})
				} else {
					reject({
						type: 'http',
						message: err.errMsg
					})
				}
			}
		});

		abort = () => {
			isAbort = true
			task.abort.call(task)
		}
	});
	promise.abort = abort
	return promise
}

/**
 * 中断请求
 * @params.context: 中断方法挂载的对象
 * @params.requestPromise: request方法的返回值
 * e.g.
 * const { status } = await abort(this.getList, this.$post('/api/login', payload))
 */
export const abort = (context, requestPromise) => {
	if (!context) {
		return requestPromise
	}
	try {
		context.abort && context.abort()
	} catch (e) {
		//TODO handle the exception
	}
	context.abort = requestPromise.abort
	return requestPromise
}
