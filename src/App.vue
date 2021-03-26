<script>
import { api_changeLanguage } from '@/api/index.js';
import { defaultLanguage } from '@/local/index.js';
export default {
	onLaunch() {
		this.syncLanguage()
	},
	onShow() {
		// #ifdef APP-PLUS
		setTimeout(() => {
			plus.navigator.closeSplashscreen();
		}, 6000);
		// #endif
	},
	methods: {
		// 和后台同步多语言
		// 启动时需要同步一次, 防止和服务器不符
		syncLanguage() {
			try {
				// 初始化的时候，和后台同步一次语言
				api_changeLanguage({ lang: defaultLanguage.requestValue });
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		}
	}
};
</script>
<style lang="scss">
@import '~@/styles/u.scss';
@import '~@/styles/f.scss';
@import '~@/styles/m.scss';
page {
	font-size: 14px;
}

// 设置全局的border
view, input, textarea, navigator {
	box-sizing: border-box;
}

button {
	color: #fff;
}
</style>
