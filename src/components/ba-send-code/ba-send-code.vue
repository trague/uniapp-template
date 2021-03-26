<!-- 验证码发送组件 -->
<template>
	<view class="app-send-vcode" :class="[{'is-disabled': !canCode}]">
		<view v-if="canCode" class="app-send-vcode__item app-send-vcode__normal" @click="sendCaptcha">{{ __t('@01@获取验证码') }}</view>
		<view v-else-if="loadingOfSubmit" class="app-send-vcode__item app-send-vcode__loading">
			<view class="t-c2">{{ __t('@01@正在发送...') }}</view>
		</view>
		<view v-else class="app-send-vcode__item app-send-vcode__waiting">
			<text class="t-c2">{{ times }}S</text>
		</view>
	</view>
</template>
<script>
import {api_sendSmsByImage, api_sendSms} from './api'
const TIME_INTERVAL = 60
const TIME_INTERVAL_FAIL = 1
export default {
	props: {
		before: {
			type: Function,
			default: () => {}
		},

		/**
		 * 发送方式
		 */
		way: {
			type: String,
			default: '',
			validator(val) {
				// sms: 短信
				// ems： 邮箱
				// smsImage
				// emsImage
				// auto: 根据登录方式自适应
				// autoImg: 根据登录方式自适应并且需要图形验证码
				return ['', 'sms', 'ems', 'smsImage'].indexOf(val) !== -1
			}
		},
		/**
		 * ajax请求的参数
		 */
		params: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {
			canCode: true,
			loadingOfSubmit: false,
			times: TIME_INTERVAL
		}
	},
	methods: {
		sendCaptcha() {
			// 可以使用此方法停止发送
			if (this.before && this.before() === false) {
				return
			}
			// this.send(api_sendSms)
			console.log(this.way)
			if (this.way) {
				switch (this.way) {
					case 'sms':
						this.send(api_sendSms)
						break
					// case 'ems':
					// 	this.send(api_sendEms)
					// 	break
					case 'smsImage':
						// if (this.params.mobile)
						this.send(api_sendSmsByImage)
						break
					// default:
					// 	this.send(api_sendSms)
					// 	break
				}
				return
			}
		},

		// 发送
		send(requestFn) {
			this.canCode = false
			this.loadingOfSubmit = true
			requestFn(this.params)
				.then(result => {
					if (result.status === 1 || result.status === true) {
						uni.showToast({
							title: this.__t('@01@发送成功')
						})
						this.times = TIME_INTERVAL
					} else {
						uni.showToast({
							icon: 'none',
							title: result.msg || this.__t('@01@发送失败')
						})

						this.times = TIME_INTERVAL_FAIL
					}
					this.loadingOfSubmit = false
					this.settimes()
				})
				.catch(error => {
					console.log(error)
					uni.showToast({
						icon: 'none',
						title: error.message
					})
					this.times = TIME_INTERVAL_FAIL
					this.loadingOfSubmit = false
					this.settimes()
				})
		},

		settimes() {
			var second = this.times
			second--
			this.times = second
			this.canCode = false
			// 回调
			var timer = setTimeout(() => {
				this.settimes()
			}, 1000)
			if (second < 1) {
				clearTimeout(timer)
				this.canCode = true
				this.times = TIME_INTERVAL
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.app-send-vcode {
	position: relative;
	flex-shrink: 0;
	white-space: nowrap;
	font-size: 24rpx;
	overflow: visible;
	text-align: center;

	&__item {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: inherit;
		height: 100%;
		width: 100%;
		cursor: pointer;
		user-select: none;
		padding-bottom: 2rpx;
	}
}
</style>
