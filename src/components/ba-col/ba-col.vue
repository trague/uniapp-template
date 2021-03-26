<template>
	<view class="ba-col" :class="[`ba-col-${span}`]" :style="{'padding-left': gutter + 'rpx', 'padding-right': gutter + 'rpx'}"><slot></slot></view>
</template>

<script>
export default {
	props: {
		span: {
			type: Number,
			default: 24
		}
	},
	computed: {
		gutter() {
			let parent = this.$parent
			while (parent && parent.baName !== 'BaRow') {
				parent = parent.$parent
			}
			let gutter = parent ? parent.gutter : 0
			
			return gutter / 2
		}
	}
}
</script>

<style lang="scss" scoped>
@for $i from 1 to 24 {
	.ba-col-#{$i} {
		width: percentage($i/24);
	}
}
</style>
