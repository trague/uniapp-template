import VueI18n from 'vue-i18n'
import Vue from 'vue'
import cn from './cn/index.js'
// import hk from './zh-hk.js'
import en from './en/en.js'

Vue.use(VueI18n)

const LANGUAGE_STORAGE_KEY = 'language_key'

export const LANGUAGE_LIST = [
	{ label: '简体中文', value: 'zh-CN', requestValue: 'cn' },
	{ label: 'English', value: 'en', requestValue: 'en' },
]

export const defaultLanguage = (function() {
	let language = ''
	try {
	    language = uni.getStorageSync(LANGUAGE_STORAGE_KEY);
	} catch (e) {
		//
	}
	const target = LANGUAGE_LIST.find(item => item.value === language)
	return target ? target : LANGUAGE_LIST[0]
}())

export const i18n = new VueI18n({
	locale: defaultLanguage.value, // 默认选择的语言
	messages: {
		'zh-CN': cn,
		// 'zh-HK': hk,
		'en': en
	}
})

export const changeLanguage = (languageValue) => {
	// 修改store中的存储的语言
	i18n.locale = languageValue
	uni.setStorageSync('language_key', languageValue);
	// 还需要修改store中的language
}

export const changeTabbar = () => {
	// uni.setTabBarItem({
	//   index: 0,
	//   text: i18n.t('tabbar.home')
	// })
	// uni.setTabBarItem({
	//   index: 1,
	//   text: i18n.t('tabbar.wallet')
	// })
	
	// uni.setTabBarItem({
	//   index: 2,
	//   text: i18n.t('tabbar.ecology')
	// })
	
	// uni.setTabBarItem({
	//   index: 3,
	//   text: i18n.t('tabbar.mine')
	// })
}