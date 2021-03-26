/**
 * 扩页面操作相关方法
 */

import get from 'lodash.get'


/**
 * 跨页面变量，用在两个页面间的对象传值，因为无需全局使用，所以不适用全局变量， 及时使用，及时删除
 * 接收页面要考虑到页面刷新问题，无值回退上一页面
 * e.g:
 * 传值页面: acrossPageVar.set(Object)
 * 接收页面:acrossPageVar.get()
 */
export const acrossPageVar = {
	value: null,
	get() {
		let value = this.value
		this.value = null
		return value
	},
	set(value) {
		this.value = value
	}
}

/**
 * 获取前面的某一个页面
 * @param delta: 前N页，默认1
 */
export const getPrePage = (delta = 1) => {
	let pages = getCurrentPages()
	let page = get(pages, `pages[pages.length - delta - 1]`, null)
	return page
}

/**
 * 获取前一个页面的实例
 */
export const getPrePageVm = (delta = 1) => {
	let pages = getCurrentPages();
	let prePage = get(pages, `pages[pages.length - delta - 1]`, null)
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
