<template>
	<view class="ba-row" :style="{'margin-left': '-' + gutter + 'rpx', 'margin-right': '-' + gutter + 'rpx'}"><slot></slot></view>
</template>

<script>
export default {
	props: {
		gutter: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			baName: 'BaRow'
		}
	}
}
</script>

<style lang="scss" scoped>
.ba-row {
	display: flex;
	flex-wrap: wrap;
}
</style>
