<template>
	<view class="ba-qr" :style="{height: sizeString, width: sizeString}">
		<view class="ba-qr__in"><image class="ba-qr__image" :src="qrSrc"></image></view>
	</view>
</template>

<script>
import QR from "./wxqrcode.js"
export default {
	props: {
		content: {
			type: String,
			default: ''
		},
		size: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			qrSrc: ''
		}
	},
	computed: {
		sizeString() {
			if (this.size) {
				return this.size + 'rpx'
			} else {
				return ''
			}
		}
	},
	watch: {
		content: {
			immediate: true,
			handler() {
				if (this.content) {
					this.qrSrc = this.createQr(this.content)
				} else {
					this.qrSrc = ''
				}
			}
		}
	},
	methods: {
		createQr(content) {
			return QR.createQrCodeImg(content, {
				size: parseInt(300),
				typeNumber: 4
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.ba-qr {
	height: 100%;
	width: 100%;
	margin-left: auto;
	margin-right: auto;

	&__in {
		background-color: #fff;
		height: 100%;
		width: 100%;
		padding: 5%;
	}

	&__image {
		height: 100%;
		width: 100%;
	}
}
</style>
