<template>
  <view class="ba-root" :class="{ 'ba-root--column': column, 'ba-root--full': full, 'ba-root--has-header': hasHeader }">
    <slot></slot>
    <ba-toast ref="baToast"></ba-toast>
  </view>
</template>

<script>
export default {
  props: {
    // 是否使用flex column布局
    column: {
      type: Boolean,
      default: false
    },
    // 是否充满布局，用在页面根元素上，需要设置page高度100%
    full: {
      type: Boolean,
      default: false
    },
    // 设置为true, 添加padding-top = 状态栏高度 + 44px(默认的header高度)
    hasHeader: {
      type: Boolean,
      default: false
    }
  },
  created() {
    var pages = getCurrentPages()
    var page = pages[pages.length - 1]
    this.toastEventName = `toast_${page.route}`
    uni.$on(this.toastEventName, this.toast)
  },
  beforeDestroy() {
    uni.$off(this.toastEventName, this.toast)
  },
  methods: {
    toast(option) {
      this.$refs.baToast.$_show(option)
    },
  }
}
</script>
<style lang="scss" scoped>
.ba-root {
  &--full {
    width: 100%;
    height: 100%;
  }
  &--column {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-direction: column;
  }
  &--has-header {
    padding-top: calc(var(--status-bar-height) + 44px);
  }
}
</style>