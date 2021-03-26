<template>
	<view>
		<ba-navbar :back="false">{{ __t('@01@首页') }}</ba-navbar>
	</view>
</template>

<script>
import get from 'lodash.get';
export default {
	data() {
		return {};
	},
	onShow() {
		this.update();
	},
	mounted() {
		// #ifdef APP-PLUS
		this.$nextTick(() => {
			plus.navigator.closeSplashscreen();
		});
		// #endif
	},
	onPullDownRefresh() {
		this.update(true);
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 500);
	},
	methods: {
		update(isForceShow) {
			// #ifdef APP-PLUS
			this.$store.dispatch('upgrade/check').then(({ isUpdate, isChange, toUpgrade }) => {
				if ((isUpdate && isChange) || (isUpdate && isForceShow)) {
					toUpgrade()
				}
			});
			// #endif
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #efeff4;
}
</style>
