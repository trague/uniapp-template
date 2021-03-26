/**
 * 随机ID
 */
export function getId(randomLength = 8) {
	return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}

export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]'

export const noPassByName = (str = '' ) => {
	if (null != str && str != undefined) {
		if (str.length <= 3) {
			return "*" + str.substring(1, str.length);
		} else if (str.length > 3 && str.length <= 6) {
			return "**" + str.substring(2, str.length);
		} else if (str.length > 6) {
			return str.substring(0, 2) + "****" + str.substring(6, str.length)
		}
	} else {
		return "";
	}
}

/**
 * 手机号脱敏
 */
export const mobileEncrypt = (mobile = '') => {
	return mobile.replace(/(\d{3})\d*(\d{4})/,'$1****$2');
}

/**
 * 姓名脱敏
 */
export const nameEncrypt = (name = '') => {
	return name ? name[0] + new Array(name.length).join('*') : ''
}

export const encrypt = ({ string = '', start = 0, end = 0, replace = '*' }) => {
	return string.split('').fill(replace, start, end).join('')
}