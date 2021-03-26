<template>
	<view></view>
</template>

<script>
export default {
	computed: {
		isLogin() {
			return this.$store.getters.isLogin;
		}
	},
	onLoad() {
		this.redirected = false;
		// 最长处理时间，如果超过设置的时间，还未区分去哪个页面，就直接进入未登录逻辑
		this.maxTimer = setTimeout(() => {
			this.unloginHandler();
		}, 2500);
		if (!this.$store.getters.isLogin) {
			// 未登录直接执行未登录处理函数
			this.unloginHandler();
			return;
		}
		this.checkLogin();
	},
	methods: {
		async checkLogin() {
			this.$store
				.dispatch('auth/refresh', false)
				.then(res => {
					this.loggedHandler();
				})
				.catch(e => {
					this.unloginHandler();
				});
		},
		// 已经登录处理函数
		loggedHandler() {
			clearTimeout(this.maxTimer);
			if (!this.redirected) {
				this.redirected = true;
				// 用reLaunch跳转，在进入收益的时候不触发动画
				uni.reLaunch({
					url: '/pages/home'
				});
			}
		},
		// 未登录处理函数
		unloginHandler() {
			clearTimeout(this.maxTimer);
			if (!this.redirected) {
				this.redirected = true;
				uni.reLaunch({
					url: '/pages/login/login'
				});
				this.$store.commit('auth/LOGOUT');
			}
		}
	}
};
</script>
