<template>
	<view class="app-load">
		<slot v-if="loading" name="loading">
			<view class="app-load__loading">
				<view class="u-loading" style="width: 20px; height: 20px;margin: auto;"></view>
				{{ t.loading }}
			</view>
		</slot>
		<slot v-else-if="error" name="error">
			<view class="app-load__error" @click="onClickError">
				<view class="app-load__error-img">
					<image v-if="error === 'timeout'" src="/static/images/ba-load/timeout.png">
					<image v-else-if="error === 'empty'" src="/static/images/ba-load/empty.png">
					<image v-else-if="error === 'offline'" src="/static/images/ba-load/offline.png">
					<image v-else-if="error === 'unknown'" src="/static/images/ba-load/unknown.png">
					<image v-else src="/static/images/ba-load/default.png">	
				</view>
				<view>{{ errorMessage }}</view>
			</view>
		</slot>
		<template v-if="!loading && !error">
			<slot name="default"><view></view></slot>
		</template>
	</view>
</template>
<script>
export default {
	props: {
		// 是否正在加载
		loading: {
			type: Boolean,
			default: false
		},
		error: {
			type: [Boolean, String],
			default: false,
			validator(val) {
				return typeof val === 'boolean' || ['unknown', 'empty', 'offline', 'timeout', 'default'].includes(val)
			}
		},
		message: {
			type: String,
			default: ''
		}
	},
	computed: {
		t() {
			return this.$t('common.appload')
		},
		errorMessage() {
			if (this.message) {
				return this.message
			}
			const MESSAGE_MAP = {
				empty: this.t.empty,
				offline: this.t.offline,
				timeout: this.t.timeout,
				default: this.t.default
			}
			return MESSAGE_MAP[this.error] || MESSAGE_MAP.default
		}
	},
	methods: {
		onClickError() {
			this.$emit('retry')
		}
	}
}
</script>
<style lang="scss" scoped>
.app-load {
	overflow: auto;
	&__loading {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		margin-top: -60rpx;
		text-align: center;
		height: 120rpx;
	}
	&__error {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		margin-top: -100rpx;
		text-align: center;
		height: 200rpx;
	}
	&__loading {
		font-size: 28rpx;
		text-align: center;
		color: #999;
		.m-loading {
			margin: 0 auto 12rpx;
			margin-bottom: 12rpx;
		}
	}

	&__error {
		color: #999;
		font-size: 14px;
	}

	&__error-img {
		image {
			// background-color: #f00;
			height: 40px;
			width: 40px;
		}
	}
}
</style>
