<template>
	<view class="root">
		<image class="title" v-if="language === 'zh-CN'" style="width: 166rpx; height: 79rpx;" src="/static/images/login/register-cn.png"></image>
		<image class="title" v-else style="width: 374rpx; height: 77rpx;" src="/static/images/login/register-en.png"></image>
		<view class="content">
			<view v-for="(item, key) in dynamicFormMap" :key="key">
				<template v-if="item.input === 'text'">
					<view class="form-item" v-if="key === 'mobile_phone'">
						<ba-select class="country-select" v-model="form.countryId" :options="countryList" label-key="fullName" value-key="id">
							<template v-slot="{ option }">
								<view class="country">
									<image :src="option ? option.nationalFlag : ''"></image>
									<ba-icon icon="down"></ba-icon>
								</view>
							</template>
						</ba-select>
						<input v-model="dynamicForm[key]" type="text" :placeholder="item.name" />
					</view>
					<view class="form-item" v-else><input v-model="dynamicForm[key]" type="text" :placeholder="item.name" /></view>
				</template>

				<view class="form-item" v-else-if="item.input === 'select'">
					<ba-select v-model="dynamicForm[key]" :options="item.select" :placeholder="item.name"></ba-select>
				</view>
			</view>

			<view class="form-item"><input v-model="form.pass1" type="password" :placeholder="$t('login.register.password1')" /></view>
			<view class="form-item"><input v-model="form.pass1c" type="password" :placeholder="$t('login.register.qrpass1')" /></view>
			<view class="form-item"><input v-model="form.pass2" type="password" :placeholder="$t('login.register.password2')" /></view>
			<view class="form-item"><input v-model="form.pass2c" type="password" :placeholder="$t('login.register.qrpass2')" /></view>

			<template v-if="dynamicFormMap.mobile_phone">
				<view class="form-item">
					<input v-model="imageCode" type="text" :placeholder="$t('login.register.yanzhengma1')" />
					<ba-image-code ref="imageCode" v-model="imageEncryptCode"></ba-image-code>
				</view>

				<view class="form-item">
					<input v-model="form.mobile_code" type="text" :placeholder="$t('login.register.yanzhengma1')" />
					<ba-send-code way="smsImage" :params="sendSmsParams"></ba-send-code>
				</view>
			</template>

			<button class="submit-btn" @click="submit" :loading="submitting" :disabled="submitting">{{ $t('common.register') }}</button>

			<view class="form-bottom">
				<navigator class="left" url="/pages/about/service">{{ $t('common.serviceCenter') }}</navigator>
				<navigator url="/pages/login/login">{{ $t('common.login') }}</navigator>
			</view>
		</view>
	</view>
</template>

<script>
import { api_registerPage, api_registerSave } from '@/api/login';
import { api_getCountrys } from '@/api/index.js';
export default {
	data() {
		return {
			isedit: false,
			countryList: [],
			form: {
				// phone: '',
				mobile_code: '',
				countryId: ''
			},
			dynamicForm: {},
			dynamicFormMap: {},
			submitting: false,
			imageCode: '',
			// 图片加密代码
			imageEncryptCode: ''
		};
	},
	computed: {
		language() {
			return this.$store.state.app.language;
		},
		sendSmsParams() {
			return {
				verify_code: this.imageCode,
				encrypt_code: this.imageEncryptCode,
				mobile: this.dynamicForm.mobile_phone
			};
		}
	},
	created() {
		this.getPageInfo();
		this.getCountrys();
	},
	methods: {
		async getCountrys() {
			try {
				const { status, msg, data } = await api_getCountrys();
				if (status === 1) {
					this.form.countryId = data[0].id;
					this.countryList = data;
				} else {
					this.$tool.toast(msg);
				}
			} catch (e) {
				console.log(e);
				this.$tool.toast(e.message);
			}
		},
		async getPageInfo() {
			uni.showLoading({
				mask: true
			});
			try {
				const { status, data, msg } = await api_registerPage();
				uni.hideLoading();
				if (status === '1') {
					let dynamicForm = {};
					let dynamicFormMap = {};
					for (let k in data.regdatasets) {
						if (data.regdatasets[k].name) {
							dynamicForm[k] = data.regdatasets[k].default || '';
							dynamicFormMap[k] = data.regdatasets[k];
						}
					}

					this.dynamicForm = dynamicForm;
					this.dynamicFormMap = dynamicFormMap;
				} else {
					this.$tool.toast(msg);
				}
			} catch (e) {
				console.log(e);
				uni.hideLoading();
				this.$tool.toast(e.message);
			}
		},

		async submit() {
			this.submitting = true;
			try {
				const payload = {
					...this.form,
					...this.dynamicForm
				};
				const { status, msg, result } = await api_registerSave(payload);
				if (status === 1) {
					this.$tool.successToast(msg);
				} else {
					this.$refs.imageCode.$_refresh();
					this.imageCode = '';
					this.$tool.toast(msg);
				}
			} catch (e) {
				console.log(e);
				this.$tool.toast(e.message);
			}
			this.submitting = false;
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	padding-top: 1px;
	background: url('~@/static/images/login/dlbg2@2x.png') no-repeat center / cover;
}
.root {
	height: 100%;
	position: relative;
	overflow: auto;
}
.title {
	margin-top: 90rpx;
	margin-left: 42rpx;
	margin-bottom: 104rpx;
}
.content {
	padding: 0 50rpx 30rpx;

	/deep/ .uni-input-placeholder {
		color: #b1b1b3;
	}

	input {
		color: #fff;
		height: 100%;
		flex-grow: 1;
		line-height: 90rpx;
		font-size: inherit;
	}
}
.submit-btn {
	margin-top: 62rpx;
	border-radius: 6rpx;
	font-size: 14px;
	height: 70rpx;
	color: #000;
	font-weight: bold;
	background: linear-gradient(135deg, #f0cb9e, #e3ad6f);

	&::after {
		display: none;
	}
}

.form-item {
	position: relative;
	height: 90rpx;
	// margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 14px;
	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid #171819;
		transform: scaleY(0.5);
	}

	/deep/ input {
		height: 100%;
		flex-grow: 1;
		line-height: 90rpx;
		color: #fff;
		font-size: inherit;
	}
}

.form-bottom {
	margin-top: 30rpx;
	font-size: 24rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	.left {
		margin-right: auto;
	}

	.split {
		padding: 0 8rpx;
	}
}

.country-select {
	white-space: nowrap;
	flex: 0;
	margin-right: 10rpx;
}

.country {
	image {
		width: 38rpx;
		height: 27rpx;
		margin-right: 10rpx;
	}
	.ba-icon {
		color: #fcfdfc;
		font-weight: bold;
	}
}
</style>
