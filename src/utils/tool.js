import { i18n } from '@/local/index.js'

export const copy = (data) => {
	uni.setClipboardData({
		data: data,
		success: () => {
			uni.showToast({
				title: i18n.t('common.copySuccess'),
				duration: 1500,
			});
		},
		fail: () => {
			uni.showToast({
				title: i18n.t('common.copyFail'),
				duration: 1500,
				icon: 'none',
			});
		}
	});
}

export const saveImage = (filePath) => {
	uni.saveImageToPhotosAlbum({
		filePath,
		success: () => {
			uni.showToast({
				title: i18n.t('common.saveImageSuccess'),
				duration: 1500,
			});
		},
		fail: (e) => {
			console.log(e)
			uni.showToast({
				title: i18n.t('common.saveImageFail'),
				icon: 'none',
				duration: 1500,
			});
		}
	})
}