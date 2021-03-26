<template>
	<view class="countdown">
		<view v-if="day > 0">{{ day }}天</view>
		<text class="num">{{ hour }}</text>
		<text class="split">:</text>
		<text class="num">{{ minute }}</text>
		<text class="split">:</text>
		<text class="num">{{ second }}</text>
	</view>
</template>
<script>
export default {
	props: {
		// 10或13位数字
		now: {
			type: [Number, String],
		},
		end: {
			type: Number
		}
	},
	data() {
		return {
			millisecond: 0,
			day: 0,
			hour: '00',
			minute: '00',
			second: '00'
		}
	},
	computed: {
		isEnd() {
			return this.millisecond <= 0
		}
	},
	watch: {
		now: {
			immediate: true,
			handler() {
				// this.calc()
				let now = this.now
				if (String(now).length === 10) {
					now = now * 1000
				}
				let end = this.end
				if (String(end).length === 10) {
					end = end * 1000
				}
				// console.log(new Date(end))
				this.millisecond = end - now
				// console.log('millisecond:', this.millisecond)
				this.calc()
			}
		},
		end: {
			immediate: true,
			handler() {
				let now = this.now
				if (String(now).length === 10) {
					now = now * 1000
				}
				let end = this.end
				if (String(end).length === 10) {
					end = end * 1000
				}
				this.millisecond = end - now
			}
		},
		isEnd: {
			immediate: true,
			handler() {
				this.isEnd ? clearTimeout(this.timer) : this.start()
			}
		}
	},
	beforeDestroy() {
		clearTimeout(this.timer)
	},
	created() {
		this.start()
	},
	methods: {
		start() {
			this.millisecond = this.millisecond - 1000
			this.calc()
			this.timer = setTimeout(() => {
				this.start()
			}, 1000)
		},
		calc() {
			let millisecond = this.millisecond
			this.day = Math.floor(millisecond / 86400000)
			millisecond -= this.day * 86400000
			this.hour = Math.floor(millisecond / 3600000)
			millisecond -= this.hour * 3600000
			this.minute = Math.floor(millisecond / 60000)
			millisecond -= this.minute * 60000
			this.second = Math.floor(millisecond / 1000).toFixed(0)
			millisecond -= this.second * 1000

			if (this.hour < 10) {
				this.hour = '0' + this.hour
			}
			if (this.minute < 10) {
				this.minute = '0' + this.minute
			}
			if (this.second < 10) {
				this.second = '0' + this.second
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.countdown {
	display: flex;
	justify-content: center;
	    align-items: center;
	
	.num {
		padding: 2rpx 4rpx;
		line-height: 14px;
	}
}
</style>
