<template>
	<view class="remember-account" v-if="displayRememberList.length && visible">
		<view class="remember-account__item" v-for="item in displayRememberList" @click="selectAccount(item)" :key="item.account">
			<view>{{ item.account }}</view>
			<view>
				<ba-icon icon="close" @click.stop="deleteAccount(item)"></ba-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			storageKey: {
				type: String,
				default: STORAGE_KEY
			},
			account: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				visible: false,
				rememberList: []
			}
		},
		watch: {
			show() {
				setTimeout(() => {
					this.visible = this.show
				}, 60)
			}
		},
		created() {
			uni.getStorage({
				key: STORAGE_KEY,
				success: res => {
					this.rememberList = res.data
				}
			})
		},
		computed: {
			displayRememberList() {
				return this.rememberList.filter(
					item => item.account.indexOf(this.account) === 0
				)
			}
		},
		methods: {
			deleteAccount(account) {
				const targetIndex = this.rememberList.findIndex(
					item => item.account === account.account
				)
				if (targetIndex !== -1) {
					this.rememberList.splice(targetIndex, 1)
					uni.setStorage({
						key: STORAGE_KEY,
						data: this.rememberList,
						success: () => {}
					})
				}
			},
			addAccount(account) {
				const targetIndex = this.rememberList.findIndex(
					item => item.account === account.account
				)
				if (targetIndex !== -1) {
					this.rememberList[targetIndex] = account
				} else {
					this.rememberList.push(account)
				}
				uni.setStorage({
					key: STORAGE_KEY,
					data: this.rememberList,
					success: () => {}
				})
			},
			selectAccount(account) {
				this.$emit('select', account)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.remember-account {
		z-index: 10;
		position: absolute;
		top: 100%;
		margin-top: 10rpx;
		background-color: #333;
		border-radius: 20rpx;
		left: 0;
		right: 0;
		color: #fff;
		padding: 15rpx 0;

		&__item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			line-height: 70rpx;
			color: #fff;
		}
	}
</style>
