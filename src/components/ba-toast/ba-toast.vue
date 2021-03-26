<template>
	<view v-show="innerValue">
		<view class="ba-toast" :class="className">{{ message }}</view>
	</view>
	<!-- <uni-transition :show="innerValue" :mode-class="['fade']"> -->
		
	<!-- </uni-transition> -->
</template>

<script>
export default {
	data() {
		return {
			message: '',
			innerValue: false,
			className: '',
		}
	},
	methods: {
		$_show(options) {
			if (typeof options === 'string') {
				options = {message: options}
			}
			let {message, time = 1500, onHide} = options
			clearTimeout(this.hideTimer)
			this.message = message
			this.innerValue = true
			this.className = 'ba-toast--in'
			if (time > 0) {
				this.hideTimer = setTimeout(() => {
					this.innerValue = false
					onHide && onHide()
				}, time)
			}
		},
		$_hide() {
			this.innerValue = false
		}
	}
}
</script>

<style lang="scss" scoped>
.ba-toast {
	position: fixed;
	z-index: 2000;
	left: 50%;
	top: 50%;
	margin-top: -20px;
	max-width: 90%;
	min-width: 60%;
	height: auto;
	width: auto;
	transform: translateX(-50%);
	margin: auto;
	text-align: center;
	border-radius: 2px;
	color: #fff;
	background: rgba(17, 17, 17, 0.7);
	min-height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 15px;
	font-size: 14px;

	
	
	&--in {
		animation: bounceout 0.2s linear;
		
		@keyframes bounceout {
			0% {
				opacity: 0;
			}
		
			100% {
				opacity: 1;
			}
		}
	}
}
</style>
