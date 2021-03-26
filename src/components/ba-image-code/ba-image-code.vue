<template>
	<image class="image-vcode" mode="widthFix" :src="imageUrl" @click="getImage" />
</template>

<script>
/**
 * 图形验证码
 */
import { api_imageVCode } from './api'
export default {
	props: {
		value: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			loading: false,
			imageUrl: '',
			innerValue: this.value
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
	created() {
		this.getImage()
	},
	methods: {
		$_refresh() {
			this.getImage()
		},
		async getImage() {
			if (this.loading) {
				return
			}
			this.loading = true
			try {
				const { encryptCode, image } = await api_imageVCode()
				this.imageUrl = image
				this.innerValue = encryptCode
			} catch (e) {
				console.log(e)
				this.$tool.toast(e.message)
			}
			this.loading = false
		}
	}
}
</script>

<style lang="scss" scoped>
	.image-vcode {
		width: 160rpx;
		height: 48rpx;
	}
</style>
