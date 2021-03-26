<template>
	<view class="root">
		<ba-navbar fixed transparent></ba-navbar>
		<view class="content">
			<view class="form-item"><input v-model="form.mobile" type="text" :placeholder="$t('login.forgotPassword.mobileP')" /></view>
			<view class="form-item"><input v-model="form.pass1" type="password" :placeholder="$t('login.forgotPassword.newPassP')" /></view>
			<view class="form-item"><input v-model="form.pass1c" type="password" :placeholder="$t('login.forgotPassword.newPasscP')" /></view>

			<view class="form-item">
				<input v-model="imageCode" type="text" :placeholder="$t('login.forgotPassword.imgCodeP')" />
				<ba-image-code ref="imageCode" v-model="imageEncryptCode"></ba-image-code>
			</view>

			<view class="form-item">
				<input v-model="form.code" type="text" :placeholder="$t('login.forgotPassword.vCodeP')" />
				<ba-send-code way="smsImage" :params="sendSmsParams"></ba-send-code>
			</view>

			<button class="form-submit" @click="submit" :loading="submitting" :disabled="submitting">{{ __t('@01@找回密码') }}</button>

			<view class="form-bottom uf-between">
				<navigator class="left" url="/pages/login-register">{{ $t('common.serviceCenter') }}</navigator>
				<navigator url="/pages/login/login">{{ $t('common.login') }}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import {api_forgetPassByMobile} from '@/api/login'
export default {
	data() {
		return {
			form: {
				mobile: '',
				pass1: '',
				pass1c: '',
				code: ''
			},
			submitting: false,
			// 图片验证码
			imageCode: '',
			// 图片加密代码
			imageEncryptCode: ''
		}
	},
	computed: {
		sendSmsParams() {
			return {
				verify_code: this.imageCode,
				encrypt_code: this.imageEncryptCode,
				mobile: this.form.mobile
			}
		}
	},
	methods: {
		async submit() {
			this.submitting = true
			try {
				const payload = {
					...this.form,
					...this.dynamicForm
				}
				const {status, msg, result} = await api_forgetPassByMobile(payload)
				if (status === 1) {
					this.$tool.successToast(msg)
				} else {
					this.$refs.imageCode.$_refresh()
					this.$tool.toast(msg)
				}
			} catch (e) {
				console.log(e)
				this.$tool.toast(e.message)
			}
			this.submitting = false
		}
	}
}
</script>

<style lang="scss">
@import '~@/styles/mixins';
page {
	height: 100%;
	background-color: #303030;
}
.root {
	min-height: 100%;
	display: flex;
	padding-top: 150px;
	box-sizing: border-box;
	justify-content: center;
	align-items: flex-end;
	background: url('~@/static/images/login/dlbg2@2x.png') no-repeat center / cover;
}
.title {
	margin-top: 90rpx;
	margin-left: 42rpx;
	margin-bottom: 104rpx;
}
.content {
	width: 656rpx;
	min-height: 1064rpx;
	padding: 350rpx 80rpx 0;
	background: url('~@/static/images/login/dlbj1@2x.png') no-repeat center / cover;
}
.type-bar {
	height: 130rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	@include mx-border-b(#171819);

	&__item {
		height: 100%;
		line-height: 130rpx;
		color: #E0E2E0;
		font-size: 40rpx;

		&.active {
			position: relative;
			color: #FCFDFC;
			&::after {
				position: absolute;
				bottom: 0;
				left: 25%;
				width: 50%;
				content: '';
				height: 9rpx;
				background-color: #FCFDFC;
				border-radius: 100px;
			}
		}

		&.first {
			margin-right: 127rpx;
		}
	}
}

.country {
	white-space: nowrap;
	margin-right: 10rpx;
	image {
		width: 38rpx;
		height: 27rpx;
		margin-right: 10rpx;
	}
	.ba-icon {
		color: #FCFDFC;
		font-weight: bold;
	}
}

.form-item {
	position: relative;
	height: 123rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 30rpx;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid #171819;
		transform: scaleY(0.5);
	}

	/deep/ .uni-input-placeholder {
		color: #B1B1B3;
	}

	input,
	.ba-lang {
		color: #fff;
		height: 100%;
		flex-grow: 1;
		line-height: 90rpx;
		font-size: inherit;
	}
}

.form-submit {
	margin-top: 62rpx;
	border-radius: 6rpx;
	font-size: 14px;
	height: 70rpx;
	color: #000;
	font-weight: bold;
	background: linear-gradient(135deg, #F0CB9E, #E3AD6F);

	&::after {
		display: none;
	}
}

.form-bottom {
	margin-top: 20rpx;
	color: #cfae7c;
	font-size: 12px;
	padding-bottom: 20px;
}
</style>
