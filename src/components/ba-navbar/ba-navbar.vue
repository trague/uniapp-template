<template>
	<view class="ba-navbar" :class="{ 'is-fixed': fixed }">
		<view class="ba-navbar__inner" :class="{'is-transparent': transparent}">
			<view class="ba-navbar__statusbar"></view>
			<view class="ba-navbar__header">
				<view class="ba-navbar__left">
					<slot name="left">
						<view v-if="back" class="ba-navbar__back" @click="backHandle">
							<ba-icon icon="back"></ba-icon>
							<!-- <image class="ba-navbar__back-image" src="../../static/images/navbar-back.png"></image> -->
						</view>
					</slot>
				</view>
				<view class="ba-navbar__title"><slot></slot></view>
				<view class="ba-navbar__right"><slot name="right"></slot></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		back: {
			type: Boolean,
			default: true
		},
		transparent: {
			type: Boolean,
			default: false
		},
		// 全部fixed，不再自动站位
		fixed: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		backHandle() {
			uni.navigateBack()
		}
	}
}
</script>

<style lang="scss" scoped>
.ba-navbar {
	line-height: 44px;
	color: #fff;
	height: calc(var(--status-bar-height) + 44px);
	
	&.is-fixed {
		position: fixed;
		z-index: 10;
	}
	&__inner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		background-color: #bdb7b2;
		background-image: linear-gradient(to right, #eee0d2, #9d9d9d);

		&.is-transparent {
			background: transparent;
		}
	}
	&__statusbar {
		height: var(--status-bar-height);
	}

	&__header {
		position: relative;
		height: 44px;
	}

	&__title {
		font-size: 16px;
		text-align: center;
		font-weight: bold;
	}

	&__left {
		position: absolute;
		height: 44px;
		top: 0;
		left: 0;
	}

	&__back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;

		&-image {
			display: block;
			height: 18px;
			width: 18px;
		}
		
		.ba-icon {
			font-size: 18px;
			color: inherit;
		}
	}

	&__right {
		position: absolute;
		height: 44px;
		min-width: 44px;
		top: 0;
		right: 0;
		font-size: 14px;
		text-align: center;
	}
}
</style>
