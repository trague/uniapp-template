const noop = () => {}
class ScreenshotShare {
	constructor() {}

	// 开始
	entry({ success = noop, fail = noop }) {
		this.success = success
		this.fail = fail
		// #ifdef H5
		this.fail({ message: '当前环境不支持该操作' })
		return false
		// #endif
		var currentWebview = this.getCurrentWebview()
		this.screenshot(currentWebview)
	}

	// 获取当前webview
	getCurrentWebview() {
		var pages = getCurrentPages();
		var page = pages[pages.length - 1];
		var currentWebview = page.$getAppWebview()
		return currentWebview;
	}

	/**
	 * 截取图片的方法
	 * @param {Object} webview 当前页面
	 */
	screenshot(webview) {
		//新图片名称
		var bitmap = new plus.nativeObj.Bitmap('screenshot');
		console.log(bitmap)
		webview.draw(bitmap, () => {
			this.bitmap2Image(bitmap)
		}, (e) => {
			this.fail({ message: '截图失败!' + e.message })
		}, {
			check: true,
			clip: { top: '0px', left: '0px', height: '100%', width: '100%' }
		});
	}

	/** 将bitmap保存成图片
	 * @param {Object} bitmap
	 */
	bitmap2Image(bitmap) {
		console.log('保存')
		var imageNmae = `_doc/${ Date.now() }/.jpg`
		// imageNmae = plus.io.convertLocalFileSystemURL(imageNmae);
		bitmap.save(imageNmae, {}, (i) => {
			this.success(i.target)
		}, (e) => {
			this.fail({ message: '保存图片失败：' + e.message })
		});
	}
}

/**
 * 保存页面到相册
 */
export const savePageToAlbum = ({ success, fail, loading = true } = {}) => {
	const screenshotShare = new ScreenshotShare()
	if (loading) {
		uni.showLoading()
	}
	screenshotShare.entry({
		success: (imgPath) => {
			uni.saveImageToPhotosAlbum({
				filePath: imgPath,
				success: () => {
					if (loading) {
						uni.hideLoading()
					}
					success ? success() : uni.showToast({
						title: '保存成功'
					})
				},
				fail: (e) => {
					if (loading) {
						uni.hideLoading()
					}
					fail ? fail(e) : uni.showToast({
						title: e.message,
						icon: 'none'
					})
				}
			});
		},
		fail: (e) => {
			if (loading) {
				uni.hideLoading()
			}
			fail ? fail(e) : uni.showToast({
				title: e.message,
				icon: 'none'
			})
		}
	})
}


export const sharePage = ({ success, fail, loading = true } = {}) => {
	const screenshotShare = new ScreenshotShare()
	if (loading) {
		uni.showLoading()
	}
	screenshotShare.entry({
		success: (imgPath) => {
			plus.share.sendWithSystem({
					type: 'image',
					pictures: [imgPath]
				},
				e => {
					if (loading) {
						uni.hideLoading()
					}
					success ? success() : uni.showToast({
						title: '分享成功'
					})
				},
				e => {
					if (loading) {
						uni.hideLoading()
					}
					fail ? fail(e) : uni.showToast({
						title: e.message,
						icon: 'none'
					})
				}
			);
		},
		fail: (e) => {
			if (loading) {
				uni.hideLoading()
			}
			fail ? fail(e) : uni.showToast({
				title: e.message,
				icon: 'none'
			})
		}
	})
}
