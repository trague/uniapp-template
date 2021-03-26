import Vue from 'vue';
import Vuex from 'vuex';

import auth from './moudles/auth.js';
import app from './moudles/app.js'
import get from 'lodash.get'
import upgrade from './moudles/upgrade.js'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules:{
		auth,
		app,
		upgrade
	},
	getters:{
		// 用户信息，无信息返回{}
		 userinfo: state => state.auth.userinfo || {},
		 // 是否登录
		 isLogin: state => {
			 return !!state.auth.userinfo && Object.prototype.toString.call(state.auth.userinfo) === '[object Object]'
		 },
		 payment: state => {
			 let userinfo = state.auth.userinfo || {}
			 return {
				 wechat: {
					 wechat: userinfo.wechat,
					 wechatCode: userinfo.wechatCode
				 },
				 alipay: {
					 alipay: userinfo.alipay,
					 payCode: userinfo.payCode
				 },
				 bank: {
					 bank_name: userinfo.bank_name,
					 bank_number: userinfo.bank_number,
					 bank_username: userinfo.bank_username,
					 bank_addr: userinfo.bank_addr,
				 }
			 }
		 },
		 hasNewMessage: state => {
		 	return state.app.newMessageNumber > 0
		 },
	}
});

export default store;
