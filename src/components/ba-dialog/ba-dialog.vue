<template>
  <view>
    <uni-popup v-model="innerValue" type="center">
      <view class="dialog">
        <view class="dialog__title">{{ title }}</view>
        <view class="dialog__message">
          <slot>{{ message }}</slot>
        </view>

        <view class="dialog__footer">
          <view v-if="cancelText" class="dialog__cancel" @click="cancel">{{ cancelText }}</view>
          <view v-if="confirmText" class="dialog__confirm" @click="confirm">{{ confirmText }}</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
  components: {
    uniPopup
  },
  data() {
    return {
      title: '',
      message: '',
      innerValue: false,
      cancelText: '取消',
      confirmText: '确认'
    }
  },
  methods: {
    cancel() {
      if (typeof this.$_cancel === 'function') {
        if (this.$_cancel() !== false) {
          this.$_hide()
        }
      } else {
        this.$_hide()
      }
    },
    confirm() {
      if (typeof this.$_confirm === 'function') {
        if (this.$_confirm() !== false) {
          this.$_hide()
        }
      } else {
        this.$_hide()
      }
    },
    $_show({
      title = '',
      message = '',
      cancelText = '取消',
      confirmText = '确认',
      confirm,
      cancel
    }) {
      this.title = title
      this.message = message
      this.cancelText = cancelText
      this.confirmText = confirmText
      this.$_confirm = confirm || ''
      this.$_cancel = cancel || ''
      this.innerValue = true
    },
    $_hide() {
      this.innerValue = false
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  width: 640rpx;
  overflow: hidden;
  font-size: 32rpx;
  background-color: #fff;
  border-radius: 20rpx;

  &__title {
    padding-top: 24px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
  }

  &__message {
    padding: 48rpx;
    overflow-y: auto;
    font-size: 28rpx;
    line-height: 40rpx;
    white-space: pre-wrap;
    text-align: center;
    word-wrap: break-word;
    padding-top: 12px;
    color: #646566;
  }

  &__footer {
    position: relative;
    display: flex;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      border-top: 1px solid #ebedf0;

      @media (-webkit-min-device-pixel-radio: 1.5),
        (min-device-pixel-radio: 1.5) {
        border-1px::after {
          -webkit-transform: scaleY(0.7);
          transform: scaleY(0.7);
        }
      }
    }
  }

  &__cancel,
  &__confirm {
    width: 50%;
    flex: 1;
    height: 100rpx;
    line-height: 96rpx;
    text-align: center;
    font-size: 28rpx;
  }

  &__cancel {
    color: #323233;
    border-right: 1px solid #ebedf0;
  }

  &__confirm {
    color: $uni-main-text-color;
  }
}
</style>
