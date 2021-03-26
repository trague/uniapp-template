/**
 * 数据计算 加减乘除截取小数位
 */
import NP from 'number-precision'

export default {
	check(array) {
		let targetIndex = array.findIndex(item => isNaN(item))
		// 如果存在不是数字的值，就不通过检测
		return targetIndex === -1
	},
	divide() {
		let args = Array.prototype.slice.apply(arguments)
		if(this.check(args)) {
			return NP.divide(...args)
		} else {
			return ''
		}
	},
	plus() {
		let args = Array.prototype.slice.apply(arguments)
		if(this.check(args)) {
			return NP.plus(...args)
		} else {
			return ''
		}
	},
	minus() {
		let args = Array.prototype.slice.apply(arguments)
		if(this.check(args)) {
			return NP.minus(...args)
		} else {
			return ''
		}
	},
	times() {
		let args = Array.prototype.slice.apply(arguments)
		if(this.check(args)) {
			return NP.times(...args)
		} else {
			return ''
		}
	},
	// 保留小数位, 直接截断
	toFixedOmit(num, len = 0) {
		if (!num) {
			return ''
		}
		return Number(num).toFixed(len)
		// let integerPart = ''
		// let decimalPart = ''
		// if (!num) {
		// 	return ''
		// }
		// num = Number(num)
		// if (isNaN(num)) {
		// 	return num
		// }
		// let nums = num.split('.')
		// integerPart = nums[0]
		// decimalPart = nums[1]
		// if (!decimalPart) {
		// 	if (len > 0) {
		// 		decimalPart = Array[len].fill(0, 0, len - 1)
		// 	}
		// } else {
		// 	if (decimalPart.length < len) {
		// 		decimalPart += 
		// 	}
		// 	let res = nums[0]
		// 	if (len < nums[1].length) {
		// 		res += '.' + nums[1]
		// 	}
		// }
	},
}