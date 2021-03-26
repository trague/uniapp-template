<template>
  <view class="ba-checker">
    <slot></slot>
  </view>
</template>

<script>
/**
 * 选择组件： 使用频率较高，无默认样式
 */
export default {
  props: {
    type: {
      type: String,
      default: 'radio'
    },
    value: [String, Number, Array, Object, Boolean],
    max: Number,
    radioRequired: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    currentValue(val) {
      this.$emit('input', val)
      this.$emit('on-change', val)
    }
  },
  data() {
    return {
      baName: 'BaChecker',
      currentValue: this.value
    }
  }
}
</script>