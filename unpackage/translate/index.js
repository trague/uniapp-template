var fs = require('fs');
var path = require('path');
var http = require('http');
var qs = require('querystring');

// 目标语言列表(不包含中文简体和中文繁体, 繁体再JS中自动翻译，不适用接口)
const TARGET_LANG_LIST = ['en']
// 翻译接口
const TRANSLATE_API = `域名/api/login/translation`
// 需要翻译的目录
const INCLUDES_FOLDER = ['pages', 'components', 'utils']
// 需要翻译的文件
const INCLUDES_FILE = ['vue', 'js']

// 源码目录，已package.json所在目录为起点
const ROOT_PATH = path.resolve('./src/')

console.log('开始遍历获取文件，收集翻译数据')
const oldCnJSON = getOldJSON('cn')
const newCnJSON = {}

getNewCnJSON(ROOT_PATH, true)

// 创建中文JSON
whiteLangJSON('cn', newCnJSON)
console.log('开始翻译')
TARGET_LANG_LIST.forEach(item => {
	translateLang(item)
})

function getOldJSON(lang) {
	let json = ''
	try {
		json = JSON.parse(fs.readFileSync(path.resolve('./', `src/local/${lang}/${lang}.json`)).toString())
	} catch (e) {
		json = {}
		console.log(e)
	}
	return json
}

function translateLang(lang) {
	let oldJSON = getOldJSON(lang)
	let newJSON = {}
	let surplusCount = Object.keys(newCnJSON).length
	for (let k in newCnJSON) {
		if (oldJSON[k]) {
			surplusCount--

			// 如果已经有翻译语言了，就不需要翻译了
			newJSON[k] = oldJSON[k]
			// console.log(surplusCount)
			if (surplusCount === 0) {
				whiteLangJSON(lang, newJSON)
			}
		} else {
			translateWord(newCnJSON[k], lang, (res) => {
				newJSON[k] = res
				surplusCount--
				process.stdout.clearLine()
				process.stdout.cursorTo(0)
				process.stdout.write(`剩余翻译 ${surplusCount} 个`, 'utf-8')
				if (surplusCount === 0) {
					whiteLangJSON(lang, newJSON)
				}
			})
		}
	}
}

function whiteLangJSON(lang, json) {
	fs.writeFileSync(path.resolve('./', `src/local/${lang}/${lang}.json`), JSON.stringify(json))
	console.log(`完成 ${lang}.json 输出`)
}

/** 
 * 获取中文的方法 
 * @param filePath 需要遍历的文件路径 
 * @param isRoot   是否是一级目录，1级目录需要过滤掉部分目录
 */
function getNewCnJSON(filePath, isRoot = false) {
	const files = fs.readdirSync(filePath)
	files.forEach(filename => {
		// 只遍历一级目录中的指定目录
		if (isRoot && !INCLUDES_FOLDER.includes(filename)) {
			return
		}
		const itemFilePath = path.resolve(filePath, filename)
		const fileStat = fs.statSync(itemFilePath)
		// 只遍历指定类型文件，其余文件无需翻译
		if (fileStat.isFile() && INCLUDES_FILE.includes(filename.split('.').pop())) {
			let filedata = fs.readFileSync(itemFilePath).toString(["UTF-8"])
			const matchs = filedata.match(/__t\('([^']*)'/g)
			let isModify = false

			if (matchs) {
				matchs.forEach(item => {
					let word = item.match(/__t\('([^']*)'/)[1]
					if (word.indexOf('@') !== 0) {
						console.log('modify word：', word)
						isModify = true
						let newWord = formatWord(word)
						filedata = filedata.replace(`__t('${word}'`, `__t('${newWord}'`)
						newCnJSON[newWord] = word
					} else {
						newCnJSON[word] = word.replace(/@\d+@/, '')
					}
				})

				if (isModify) {
					fs.writeFileSync(itemFilePath, filedata)
				}
			}
		} else if (fileStat.isDirectory()) {
			getNewCnJSON(itemFilePath)
		}
	})
}

function formatWord(word, index = 1) {
	// 默认使用两位显示，因为一般一个项目相同的文字不会超过99个
	if (index < 10) {
		index = '0' + index
	}
	let res = '@' + index + '@' + word
	if (oldCnJSON[res] || newCnJSON[res]) {
		return formatWord(word, Number(index) + 1)
	} else {
		return res
	}
}

function translateWord(word, lang, callback) {
	post({
		url: TRANSLATE_API,
		data: {
			'value': word,
			'to': lang
		},
		success(res) {
			let word = ''
			try {
				const {
					status,
					data
				} = JSON.parse(res)
				word = data
			} catch (e) {
				console.log(e)
				callback('')
			}
			callback(word)
		},
		fail() {
			callback('')
		},
	})
}

function post({
	url,
	data = {},
	success,
	fail
}) {
	const postData = qs.stringify(data);
	let response = ''

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	};

	const req = http.request(url, options, (res) => {
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			response = chunk
		});
		res.on('end', (e) => {
			clearTimeout(timer)
			success(response)
		});
	});

	let timer = setTimeout(() => {
		req.abort()
	}, 2000)

	req.on('error', (e) => {
		clearTimeout(timer)
		console.error(`请求遇到问题: ${e.message}`)
		fail('')
	})

	// 将数据写入请求主体。
	req.write(postData)
	req.end()
}
