<template>
  <view class="ba-popup" v-show="innerValue" :class="[`ba-popup--${type}`, `ba-popup--${animate}`]">
    <view class="ba-popup__mask" @click="onClickMask" v-if="mask"></view>
    <view class="ba-popup__content" @click.stop="onClickContent">
      <slot></slot>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    // v-model控制展示与否
    value: {
      type: Boolean,
      default: false
    },
    // 位置
    type: {
      type: String,
      default: 'center',
      validator(v) {
        return ['center', 'left', 'right', 'top', 'bottom']
      }
    },

    // 是否在点击遮罩层后关闭
    maskClick: {
      type: Boolean,
      default: true
    },
    // 是否显示遮罩层
    mask: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerValue: false,
      animate: 'normal'
    }
  },
  watch: {
    innerValue() {
      this.$emit('input', this.innerValue)
    },
    value() {
      this.value ? this.open() : this.close()
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    open() {
      this.$emit('open')
      this.innerValue = true
      this.animate = 'open'
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('opened')
      }, 300)
    },
    close() {
      this.animate = 'close'
      this.$emit('close')
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.innerValue = false
        this.animate = ''
        this.$emit('closed')
      }, 300)
    },
    onClickContent() {
      //
    },
    onClickMask() {
      // 点击遮罩层事件
      this.$emit('click-mask')
      if (this.maskClick) {
        this.close()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ba-popup {
  position: fixed;
  /* #ifdef H5 */
  top: var(--window-top);
  /* #endif */
  /* #ifndef H5 */
  top: 0;
  /* #endif */
  bottom: 0;
  left: 0;
  right: 0;
  /* #ifndef APP-NVUE */
  z-index: 99;
  /* #endif */

  &--center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(#000, 0.5);
  }

  &--open &__mask {
    animation: fadein 0.3s;
    @keyframes fadein {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
  }

  &--close &__mask {
    animation: fadeout 0.3s;
    opacity: 0;
    @keyframes fadeout {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }
  }

  &__content {
    position: relative;
    z-index: 2;
  }

  &--center.ba-popup--open &__content {
    animation: center-in 0.3s;
    @keyframes center-in {
      0% {
        transform: scale(0);
      }
      90% {
        transform: scale(1.05);
      }
      100% {
        transform: translateY(1);
      }
    }
  }

  &--center.ba-popup--close &__content {
    animation: center-out 0.3s;
    transform: scale(0);
    @keyframes center-out {
      0% {
        transform: scale(1);
      }

      100% {
        transform: scale(0);
      }
    }
  }

  &--bottom &__content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: var(--window-bottom);
  }

  &--bottom.ba-popup--open &__content {
    animation: popup-in 0.3s;
    @keyframes popup-in {
      0% {
        transform: translateY(100%);
      }

      100% {
        transform: translateY(0);
      }
    }
  }

  &--bottom.ba-popup--close &__content {
    animation: popup-out 0.3s;
    transform: translateY(100%);
    @keyframes popup-out {
      0% {
        transform: translateY(0);
      }

      100% {
        transform: translateY(100%);
      }
    }
  }

  &--top &__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  &--top.ba-popup--open &__content {
    animation: popup-top-in 0.3s;
    @keyframes popup-top-in {
      0% {
        transform: translateY(-100%);
      }

      100% {
        transform: translateY(0);
      }
    }
  }

  &--top.ba-popup--close &__content {
    animation: popup-top-out 0.3s;
    transform: translateY(-100%);
    @keyframes popup-top-out {
      0% {
        transform: translateY(0);
      }

      100% {
        transform: translateY(-100%);
      }
    }
  }

  &--left &__content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  &--left.ba-popup--open &__content {
    animation: popup-left-in 0.3s;
    @keyframes popup-left-in {
      0% {
        transform: translateX(-100%);
      }

      100% {
        transform: translateX(0);
      }
    }
  }

  &--left.ba-popup--close &__content {
    animation: popup-left-out 0.3s;
    transform: translateX(-100%);
    @keyframes popup-left-out {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(-100%);
      }
    }
  }

  &--right &__content {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
  }

  &--right.ba-popup--open &__content {
    animation: popup-right-in 0.3s;
    @keyframes popup-right-in {
      0% {
        transform: translateX(100%);
      }

      100% {
        transform: translateX(0);
      }
    }
  }

  &--right.ba-popup--close &__content {
    animation: popup-right-out 0.3s;
    transform: translateX(100%);
    @keyframes popup-right-out {
      0% {
        transform: translateX(0);
      }

      100% {
        transform: translateX(100%);
      }
    }
  }
}
</style>
