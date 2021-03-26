<template>
	<view class="">
		<view>
			<view class="app-update-mask">
				<view class="dialog">
					<view class="close-wrap" @click="close"><icon type="clear" size="26" class="close" color="#cccccc" /></view>
					<view><image class="logo" src="/static/images/logo.png" mode=""></image></view>
					<view class="title">版本升级</view>
					<view class="message">V{{ option.version }}</view>
					<view class="footer">
						<view class="update-button" @click="update" v-if="!downloading">立即升级</view>
						<view class="progress" v-else-if="percent > 0">
							<view class="real-progress" :style="{ width: percent + '%' }">
								<view class="real-progress__inner">{{ percent }} %</view>
							</view>
							{{ percent }} %
						</view>
						<view v-else>下载中...</view> 
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	computed: {
		option() {
			return this.$store.state.upgrade.option;
		},
		downloading: {
			get() {
				return this.$store.state.upgrade.downloading;
			},
			set(val) {
				this.$store.commit('upgrade/CHANGE_DOWNLOADING', val);
			}
		},
		percent: {
			get() {
				return this.$store.state.upgrade.downPercent;
			},
			set(val) {
				this.$store.commit('upgrade/CHANGE_PERCENT', val);
			}
		}
	},
	methods: {
		close() {
			uni.navigateBack({});
		},
		update() {
			this.percent = 0;
			var platform = plus.os.name.toLocaleLowerCase();
			const suffix = this.option.url.split('.').splice(-1)[0];

			if (!['apk', 'wgt'].includes(suffix)) {
				plus.runtime.openURL(this.option.url);
			} else {
				this.downloading = true;
				var downloadTask = uni.downloadFile({
					url: this.option.url,
					success: downloadResult => {
						this.downloading = false;
						if (downloadResult.statusCode === 200) {
							plus.runtime.install(
								downloadResult.tempFilePath,
								{
									force: true
								},
								function() {
									plus.runtime.restart();
								},
								e => {
									console.log(e);
									this.success = false;
									uni.showToast({
										title: '安装升级包失败',
										icon: 'none'
									});
								}
							);
						} else {
							uni.showToast({
								icon: 'none',
								title: '下载失败'
							});
						}
					},
					complete: () => {
						this.downloading = false;
					}
				});
				downloadTask.onProgressUpdate(e => {
					this.percent = e.progress;
				});
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: transparent;
}
.app-update-mask {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background-color: rgba(#000, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
}
.dialog {
	position: relative;
	width: 600rpx;
	overflow: hidden;
	font-size: 32rpx;
	background-color: #fff;
	border-radius: 6rpx;
	padding-top: 60rpx;

	.logo {
		display: block;
		height: 100rpx;
		width: 100rpx;
		margin: 0 auto;
		border-radius: 15rpx;
	}

	.title {
		font-size: 28rpx;
		text-align: center;
		margin: 40rpx auto 30rpx;
		// color: #000;
	}

	.message {
		font-size: 24rpx;
		text-align: center;
		color: #999;
		padding-bottom: 40rpx;
	}

	.footer {
		color: #333;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		&::before {
			position: absolute;
			content: '';
			top: 0;
			left: 0;
			right: 0;
			border-top: 1px solid #ccc;
			transform: scaleY(0.5);
		}

		.real-progress {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			width: 0;
			overflow: hidden;
			height: 100rpx;

			&__inner {
				width: 600rpx;
				text-align: center;
				line-height: 100rpx;
				color: #fff;
				background-color: #333;
				// background-color: $uni-main-text-color;
			}
		}
	}

	.update-button {
		height: 99rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-wrap {
		position: absolute;
		right: 16rpx;
		top: 16rpx;
		color: #333;
	}
	.close {
		color: #333;
	}
}
</style>
