<template>
  <view @click="copy">
    <slot></slot>
  </view>
</template>

<script>
import { copy } from '@/utils/tool'
export default {
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  methods: {
    copy() {
      copy(this.content)
    }
  }
}
</script>
