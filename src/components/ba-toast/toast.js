// 调用此接口，页面中必须有 <ba-root></ba-root>, 参数请查看此组件
const toast = (option) => {
	var pages = getCurrentPages()
	var page = pages[pages.length - 1]
	let toastEventName = `toast_${page.route}`
	uni.$emit(toastEventName, option)
}

toast.error = (option) => {
	if (typeof option === 'string') {
		option = {
			message: option
		}
	}
	toast({
		...option,
		type: 'error'
	})
}

toast.success = (option) => {
	if (typeof option === 'string') {
		option = {
			message: option
		}
	}
	toast({
		...option,
		type: 'success'
	})
}

export default toast
