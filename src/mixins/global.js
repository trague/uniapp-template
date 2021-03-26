import { formatDate } from '@/utils/date.js'
export default {
	filters: {
		formatDate
	},
	data() {
		return {
			// 搭配 MLoad 组件使用
			mx_load: {
				loading: false,
				error: false,
				message: '',
				show: true
			}
		}
	},
	onShow() {
	  const pages = getCurrentPages()
	  const page = pages[pages.length - 1]
	  if (page) {
	    // 把路径转换成可以翻译的对象路径 pages/mine/profile => pages.mine.profile
	    const path = page.route.replace(/\//g, '.')
	    let title = this.$t(path)
	    // 如果不是string, 可能是tab页类型 pages/mine => 翻译访问路径应该是 pages.mine.index
	    if (typeof title !== 'string') {
	      title = this.$t(path + '.index')
	    }
	    // 如果还等于path，说明没翻译，就不用管
	    if (![path, `${path}.index`].includes(title)) {
	      uni.setNavigationBarTitle({
	        title,
	      })
	    }
	  }
	},
	methods: {
		__t(field, params) {
			return this.$t(field, params)
		},
		// MLoad组件配套, 请求开始使用, 展示loading状态
		mx_loadStart() {
			this.mx_load.loading = true
			this.mx_load.error = false
			this.mx_load.message = ''
			this.mx_load.show = !this.mx_load.loading && !this.mx_load.error
		},
		/**
		 * MLoad组件配套， 请求错误使用, 展示错误状态
		 * message: '错误信息', 特殊值回特别处理: ['empty']
		 * type: 错误类型
		 */
		mx_loadError(message, type = 'default') {
			this.mx_load.loading = false
			
			// 特殊的message进行特殊的处理
			if (message === 'empty') {
				message = this.$t('common.nodata')
				type = 'empty'
			}
			
			this.mx_load.error = type
			this.mx_load.message = message
			this.mx_load.show = !this.mx_load.loading && !this.mx_load.error
		},
		/**
		 * MLoad组件配套， 请求结束使用
		 */
		mx_loadEnd() {
			this.mx_load.loading = false
			this.mx_load.show = !this.mx_load.loading && !this.mx_load.error
		},
	}
}
