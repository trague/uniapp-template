<template>
	<view class="root">
		<image class="title" v-if="language === 'zh-CN'" style="width: 166rpx; height: 79rpx;" src="/static/images/login/login-cn.png"></image>
		<image class="title" v-else style="width: 226rpx; height: 77rpx;" src="/static/images/login/login-en.png"></image>
		<view class="content">

			<view class="type-bar">
				<view class="type-bar__item active first">{{ __t('@01@手机登录') }}</view>
				<navigator class="type-bar__item" url="/pages/login/register">{{ __t('@01@注册') }}</navigator>
			</view>
			<view>
				<view class="form-item">
					<ba-select v-model="form.countryId" :options="countryList" label-key="fullName" value-key="id">
						<template v-slot="{option}">
							<view class="country">
								<image :src="option ? option.nationalFlag : ''"></image>
								<ba-icon icon="down"></ba-icon>
							</view>
						</template>
					</ba-select>
					<input type="text" v-model="form.username" :placeholder="__t('@01@请输入手机号码')" />
				</view>
				<view class="form-item"><input type="password" v-model="form.password" :placeholder="__t('@01@请输入登录密码')" /></view>

				<button class="form-submit" :loading="submitting" :disabled="submitting" @click="submit">{{ __t('@01@登录') }}</button>
				<view class="form-bottom uf-between">
					<ba-lang class="ba-lang"></ba-lang>
					<navigator class="forgot-password" url="/pages/login/forgot-password">{{ __t('@01@忘记密码') }}</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {api_login} from '@/api/login'
import {api_getCountrys} from '@/api/index.js'
import {authLogin} from '@/utils/auth'
export default {
	data() {
		return {
			countryList: [],
			form: {
				countryId: '',
				username: '',
				password: ''
			},
			submitting: false
		}
	},
	computed: {
		language() {
			return this.$store.state.app.language
		}
	},
	created() {
		this.getCountrys()
		// #ifdef APP-PLUS
		this.$store.dispatch('upgrade/check').then(({isUpdate, isChange, toUpgrade}) => {
			if (isUpdate && isChange) {
				toUpgrade()
			}
		})
		// #endif
	},
	mounted() {
		try {
			// #ifdef APP-PLUS
			this.$nextTick(() => {
				plus.navigator.closeSplashscreen()
			})
			// #endif
		} catch (e) {
			//
		}
	},
	methods: {
		async getCountrys() {
			try {
				const {status, msg, data} = await api_getCountrys()
				if (status === 1) {
					this.form.countryId = data[0].id
					this.countryList = data
				} else {
					this.$tool.toast(msg)
				}
			} catch (e) {
				console.log(e)
				this.$tool.toast(e.message)
			}
		},
		async submit() {
			this.submitting = true
			try {
				const payload = {
					...this.form
				}
				const {status, msg, result} = await api_login(payload)
				if (status === 1) {
					authLogin(result)
					uni.switchTab({
						url: '/pages/home'
					})
				} else {
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
	flex-direction: column;
	justify-content: space-between;
	padding-top: var(--status-bar-height);
	box-sizing: border-box;
	align-items: center;
	background: url('~@/static/images/login/dlbg2@2x.png') no-repeat center / cover;
}
.title {
	margin-top: 20px;
	margin-bottom: 80px;
	align-self: flex-start;
	margin-left: 30rpx;
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
		color: #FCFDFC;
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
	
}
</style>
