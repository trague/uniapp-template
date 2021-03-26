/**
 * 格式化的集合
 */


/**
 * 将字符串中的某些想替换成指定字符
 * 15212312312 => 152****2312
 * @param option.string 指定字符串
 * @param option.start  替换字符的开始位置
 * @param option.end    替换字符的结束位置
 * @param option.replace替换字符
 */
export const encrypt = ({ string = '', start = 0, end = 0, replace = '*' }) => {
	return string.split('').fill(replace, start, end).join('')
}

/**
 * 姓名脱敏
 */
export const nameEncrypt = (name = '') => {
	return name ? name[0] + new Array(name.length).join('*') : ''
}

/**
 * 手机号脱敏
 */
export const mobileEncrypt = (mobile = '') => {
	return mobile.replace(/(\d{3})\d*(\d{4})/,'$1****$2');
}

/**
 * 添加千位分隔符常用于金额
 */
export const formatWithThousandsSeparator = (s) => {
	if (/[^0-9\.]/.test(s)) return s;
	    try {
	        s = String(s);
	        s = s.replace(/^(\d*)$/, "$1.");
	        s = (s + "&end").replace(/(\d*\.\d*)\d*/, "$1");
	        s = s.replace(".", ",");
	        var re = /(\d)(\d{3},)/;
	        while (re.test(s))
	            s = s.replace(re, "$1,$2");
	
	        s = s.replace(/,(\d*)&end$/, ".$1");
	
	        if (s.substring(s.length - 1, s.length) == '.')
	            s = s.substring(0, s.length - 1);
	    } catch (e)
	            { }
	    return s;
}

/**
 * 格式化身份证号添加空格
 */
export const formatIDCardWidthSpace  = () => {
	
}

/**
 * 格式化手机号添加空格
 */
export const formatMobileWidthSpace = () => {
	
}