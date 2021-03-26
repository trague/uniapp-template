<template>
	<view @click="open" class="app-select ba-select">
		<slot :option="currentOption">
			<view class="app-select__inner">
				<input class="app-select__input" :disabled="true" type="text" :placeholder="formattedPlaceholder" :value="displayText" />
				<ba-icon icon="down"></ba-icon>
			</view>
		</slot>
		<uniPopup v-model="opened" type="bottom">
			<scroll-view scroll-y class="app-select__scroll">
				<view v-for="(item, index) in formattedOptions" :key="item[valueKey]" class="app-select__option" @click.stop="select(item, index)">{{ item[labelKey] }}</view>
			</scroll-view>
		</uniPopup>
	</view>
</template>

<script>
/**
 * TODO:
 * 1. 绑定方式 bindType index value key option
 * 2. options类型: [{l,v}], [v, v, v], { l:v, l:v }, { v: { l, o }, v: { l, o } }
 */
/**
 * <a-select v-model="form.select" :options="options" @change="onChange({ option, index })"></a-select>
 */
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
	components: {
		uniPopup
	},
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number],
			default: ''
		},
		// [{ label, value }]
		// or { value1: key1, value2: key2 }
		options: {
			type: [Array, Object],
			default() {
				return []
			}
		},
		labelKey: {
			type: String,
			default: 'label'
		},
		valueKey: {
			type: String,
			default: 'value'
		}
	},
	data() {
		return {
			innerValue: this.value,
			opened: false
		}
	},
	computed: {
		formattedOptions() {
			if (Object.prototype.toString.call(this.options) === '[object Array]') {
				return this.options
			} else { 
				let options = []
				for (let k in this.options) {
					options.push({ 
						[this.labelKey]: this.options[k],
						[this.valueKey]: k
					})
				}
				return options
			}
		},
		currentOption() {
			return this.formattedOptions.find(item => item[this.valueKey] === this.innerValue) || {}
		},
		displayText() {
			const target = this.formattedOptions.find(item => item[this.valueKey] === this.innerValue) || {}
			return target[this.labelKey] || ''
		},
		formattedPlaceholder() {
			return this.placeholder || this.$t('common.pleaseSelect')
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
	methods: {
		$_open() {
			this.opened = true
		},
		open() {
			this.opened = true
		},
		select(option, index) {
			this.innerValue = option[this.valueKey]
			this.$emit('change', { option, index })
			this.opened = false
		}
	}
}
</script>

<style lang="scss">
.app-select {
	width: 100%;
	flex: 1;
	// display: flex;
	// align-items: center;
	// justify-content: flex-start;

	&__inner {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	&__input {
		flex-grow: 1;
		background-color: transparent;
	}
	&__arrow {
		height: 20rpx;
		width: 20rpx;
		margin-left: 0.5rem;
		flex-shrink: 0;
	}
	&__scroll {
		height: 500rpx;
		background-color: $uni-bg-color;
		border-radius: 30rpx 30rpx 0 0;
	}

	&__option {
		position: relative;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			border-bottom: 1px solid $uni-border-color;
			transform: scaleY(0.5);
		}
	}
}
</style>
