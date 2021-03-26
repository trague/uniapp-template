<template>
  <view>
    <view @click="showSelect">
      <slot :language="language">{{ language.label }}</slot>
    </view>

    <ba-select
      style="height: 0; width: 0; overflow: hidden;"
      ref="select"
      :options="LANGUAGE_LIST"
      @change="onLanguageChange"
    ></ba-select>
  </view>
</template>

<script>
import { LANGUAGE_LIST } from '@/local'
import { api_changeLanguage } from '@/api'
export default {
  data() {
    return {
      LANGUAGE_LIST
    }
  },
  computed: {
    language() {
      return (
        LANGUAGE_LIST.find(
          item => item.value === this.$store.state.app.language
        ) || LANGUAGE_LIST[0]
      )
    }
  },
  methods: {
    showSelect() {
      this.$refs.select.$_open()
    },
    async onLanguageChange({ option }) {
      uni.showLoading({})
      try {
        const { status, msg } = await api_changeLanguage({
          lang: option.requestValue
        })
        uni.hideLoading()
        this.$store.commit('app/CHANGE_LANGUAGE', option.value)
        if (status === 1) {
          this.$store.commit('app/CHANGE_LANGUAGE', option.value)
        } else {
          this.$tool.toast(msg)
        }
      } catch (e) {
        uni.hideLoading()
        //TODO handle the exception
        this.$tool.toast(e.message)
      }
    }
  }
}
</script>

<style></style>
