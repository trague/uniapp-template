<template>
	<view class="ba-form-item" :class="classNames">
		<view class="ba-form-item__top">
			<view class="ba-form-item__label">
				<slot name="label">{{ label }}</slot>
			</view>

			<view class="ba-form-item__body"><slot></slot></view>
		</view>

		<view class="ba-form-item__bottom"><slot name="bottom"></slot></view>
	</view>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: ''
		},
		border: {
			type: Boolean,
			default: true
		},
		labelPosition: {
			type: String,
			default: 'top',
			validator(v) {
				return ['top', 'left'].includes(v)
			}
		}
	},
	computed: {
		classNames() {
			let names = []
			if (this.border) {
				names.push('ba-form-item--border')
			}
			if (this.labelPosition === 'left') {
				names.push('ba-form-item--label-left')
			}
			return names.join(' ')
		}
	}
}
</script>

<style lang="scss" scoped>
@import '~@/styles/mixins.scss';
.ba-form-item {
	font-size: 14px;
	background-color: #fff;
	padding: 0 30rpx;
	margin-bottom: 20px;
	&__label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
		color: #666;
	}

	&__body {
		display: flex;
		align-items: center;
		flex-grow: 1;
		/deep/ input {
			flex-grow: 1;
			height: 34px;
			font-size: 14px;
		}
	}

	&--border &__body {
		@include mx-border-b(#e6e6e6);
	}
	
	&--label-left &__top {
		display: flex;
	}
	
	&--label-left &__label {
		margin-bottom: 0;
	}

	&__bottom {
		font-size: 12px;
		margin-top: 4px;
	}
}
</style>
