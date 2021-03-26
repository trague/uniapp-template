<template>
  <view class="ba-loading" :class="{ 'ba-loading--row': row }" :style="{ color: color }">
    <view class="ba-loading__spinner" :style="{ height: size, width: size }">
      <view v-for="i in 12" :key="i" :class="[`spinner-${i}`]"></view>
    </view>
    <view class="ba-loading__text" :style="{ fontSize: textSize }">
      <slot></slot>
    </view>
  </view>
</template>

<script>
/**
 * 加载图标组件
 */
export default {
  props: {
    // 颜色，可用css.color覆盖
    color: {
      type: String,
      default: ''
    },
    // 加载图标大小
    size: {
      type: String
    },
    // 文字大小
    textSize: {
      type: String
    },
    // 是否横向排列
    row: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.ba-loading {
  color: #c8c9cc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &--row {
    flex-direction: row;
  }
}
.ba-loading__spinner {
  position: relative;
  width: 30px;
  height: 30px;
  font-size: 0;
  margin-bottom: 10rpx;
  animation: rotate 0.8s linear infinite;
  animation-timing-function: steps(12);
  view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &::after {
      display: block;
      width: 2px;
      height: 25%;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 40%;
      content: ' ';
    }

    @for $i from 1 through 12 {
      &.spinner-#{$i} {
        transform: rotate($i * 30deg);
        opacity: 1 - (0.75 / 12) * ($i - 1);
      }
    }
  }
}

.ba-loading__text {
  font-size: 14px;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>