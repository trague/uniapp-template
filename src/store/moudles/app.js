import { changeLanguage, defaultLanguage } from '@/local/index.js'

export default {
	namespaced: true,
	state: {
		// 当前语言
		language: defaultLanguage.value,
		// 是否正在预览图片, 用来辅助修复预览图片会触发页面onHide和onShow的问题
		isPreviewImage: false,
	},
	mutations: {
		CHANGE_LANGUAGE(state, language) {
			state.language = language
			changeLanguage(language)
		},
		CHANGE_PREVIEW_IMAGE(state, bol) {
			state.isPreviewImage = bol
		},
	},
	actions: {
	}
}
