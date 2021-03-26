<template>
  <view class="ba-input">
    <input
      v-model="innerValue"
      type="text"
      :password="type === 'password' && !passwordIsShow"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <ba-icon
      v-if="eye && type === 'password'"
      :icon="passwordIsShow ? 'eye' : 'eye-off'"
      @click="passwordIsShow = !passwordIsShow"
    ></ba-icon>
    <ba-icon v-if="clear" icon="clear" @click="innerValue = ''"></ba-icon>
    <ba-icon v-if="loading" icon="loading" class="ba-icon-loading"></ba-icon>
  </view>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    eye: {
      type: Boolean,
      default: true
    },
    clear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      innerValue: this.value,
      passwordIsShow: false
    }
  },
  computed: {
    innerType() {
      let type = this.type
      if (type === 'password' && !this.passwordIsShow) {
        type === 'password'
      } else {
        type = this.type || 'text'
      }
      return type
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.ba-input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: inherit;

  input {
    flex-grow: 1;
    border: 0;
    font-size: inherit;
  }

  .ba-icon {
    flex-shrink: 0;
    font-size: 32rpx;
    margin-left: 0.5em;
    color: #999;
  }

  .ba-icon-loading {
    animation: rotate 1.8s linear infinite;
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>