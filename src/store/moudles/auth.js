import { request } from '@/utils/request'
const STORAGE_KEY_USERINFO = 'userifno'

const userinfo = (function() {
	try {
		return uni.getStorageSync(STORAGE_KEY_USERINFO)
	} catch (e) {
		return null
	}
}())


export default {
	namespaced: true,
	state: {
		// 用户信息
		userinfo,
	},
	mutations: {
		// 前端登录，保存账号信息到本地
		LOGIN(state, userinfo) {
			state.userinfo = userinfo
			uni.setStorageSync(STORAGE_KEY_USERINFO, userinfo)
		},
		// 前端退出，删除账号信息
		LOGOUT(state, userinfo) {
			state.userinfo = null
			uni.removeStorage({
				key: STORAGE_KEY_USERINFO
			})
		},
	},
	actions: {
		// 登录请求
		async login({ commit }, payload) {
			try {
				const { status, result } = await request('/api/login/login', payload)
				if (+status === 1) {
					commit('LOGIN', result)
					return Promise.resolve(result)
				} else {
					return Promise.reject({ message: msg })
				}
			} catch (e) {
				return Promise.reject(e)
			}
		},

		// 执行退出
		async logout({ commit }) {
			commit('LOGOUT')
			// 请求退出接口，不用处理接口是对是错，因为前端已是退出状态
			request('/api/login/logout', { __unLoginHandle: true })
		},

		// 刷新用户信息数据
		async refresh({ commit, state }, unLoginHandle = true) {
			let userinfo = state.userinfo || {}
			try {
				const { status, data } = await request('/api/member/memberInfo', { __unLoginHandle: unLoginHandle })
				if (+status === 1) {
					const newUserinfo = { ...userinfo, ...result.data }
					commit('LOGIN', newUserinfo)
					return Promise.resolve(newUserinfo)
				} else {
					return Promise.reject({ message: msg })
				}
			} catch (e) {
				return Promise.reject(e.message)
			}
		}
	}
}
