<template>
	<view class="ba-upload-single" @click="uploadImage">
		<view v-if="uploading" class="ba-upload-single__mask">
			<view v-if="percent <= 0 || percent >= 100" class="m-loading"></view>
			<view v-if="percent > 0 && percent < 100">{{ percent }}%</view>
		</view>
		<slot v-else-if="!innerValue"><view class="ba-upload-single__handle">+</view></slot>
		<slot name="end" v-else><image class="ba-upload-single__avatar" :src="innerValue"></image></slot>
	</view>
</template>

<script>
/**
 * 单图片上传组件
 */
import {UPLOAD_IMAGE_URL} from '@/constants/index.js'
export default {
	props: {
		value: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			percent: 0,
			uploading: false,
			innerValue: this.value
		}
	},
	watch: {
		value() {
			this.abort()
			this.percent = 0
			this.innerValue = this.value
		},
		innerValue() {
			this.$emit('input', this.innerValue)
		}
	},
	methods: {
		abort() {
			try {
				this.uploadTask && this.uploadTask.abort()
			} catch (e) {
				console.log(e)
				//TODO handle the exception
			}
		},
		uploadImage() {
			if (this.disabled) {
				return
			}
			uni.chooseImage({
				count: 1,
				success: result => {
					this.abort()
					this.uploading = true
					this.percent = 0

					this.uploadTask = uni.uploadFile({
						url: UPLOAD_IMAGE_URL,
						filePath: result.tempFilePaths[0],
						name: 'file_upload',
						formData: {
							userid: String(this.$store.getters.userinfo.id),
							sessionid: this.$store.getters.userinfo.sessionid,
							dir: 'face'
						},
						success: res => {
							const result = JSON.parse(res.data)
							const {status, msg, url} = result
							if (status === 1) {
								this.innerValue = result.url
							} else {
								this.$tool.toast(msg)
							}
						},
						fail: res => {
							this.$tool.toast(res.errMsg)
						},
						complete: () => {
							this.uploading = false
							this.percent = 0
						}
					})
					this.uploadTask.onProgressUpdate(res => {
						this.percent = res.progress
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.ba-upload-single {
	position: relative;
	height: 90px;
	width: 90px;
	&__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		// border-radius: 50%;
		z-index: 1;
		background-color: rgba(#000, 0.2);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}

	.u-loading {
		height: 40rpx;
		width: 40rpx;
	}

	&__avatar {
		display: block;
		height: 100%;
		width: 100%;
	}

	&__handle {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26px;
		color: #ccc;
		border: 1px dotted #ccc;
		border-radius: 2px;
	}
}
</style>
