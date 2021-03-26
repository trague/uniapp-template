<template>
	<view>
		<uni-popup v-model="innerValue" type="bottom">
			<view class="vcode">
				<view class="vcode__header">
					<view>{{ tcommon.vcodepopup.title }}</view>
					<view @click="innerValue = false">{{ tcommon.cancel }}</view>
				</view>
				<view class="vcode__body">
					<view class="m-form-group">
						<view class="m-form-label">{{ account }}</view>
						<view class="m-form-control">
							<input type="text" v-model="code" :placeholder="tcommon.vcodepopup.vcodeP" />
							<ba-send-code :way="way" :params="sendCodeParams"></ba-send-code>
						</view>
					</view>
					
					<button class="m-linear-btn" @click="confirm">{{ tcommon.confirm }}</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
	components: {
		uniPopup
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		way: {
			// sms ems
			type: String,
			default: ''
		},
		account: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			code: '',
			innerValue: false
		}
	},
	computed: {
		tcommon() {
			return this.$t('common')
		},
		sendCodeParams() {
			if (this.way === 'sms') {
				return { mobile: this.account }
			}
			if (this.way === 'ems') {
				return { email: this.account }
			}
			return {}
		}
	},
	watch: {
		value() {
			this.innerValue = this.value
		},
		innerValue() {
			this.$emit('input', this.innerValue)
		}
	},
	methods: {
		confirm() {
			this.$emit('confirm', { code: this.code })
		},
	}
}
</script>

<style lang="scss" scoped>
.vcode {
	background-color: #1f1b47;

	&__header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		height: 80rpx;
		font-size: 22rpx;
		color: #fff;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			border: 1px solid #2a2a63;
			transform: scaleY(0.5);
		}
	}

	&__body {
		padding: 30rpx;
	}
}
</style>
