<template>
	<div class="ba-load">
		<!-- 错误为假的时候显示 -->
		<template v-if="!error">
			<!-- bugfix: https://github.com/vuejs/vue/issues/10416 -->
			<div key="beforebugfix"></div>
			<slot></slot>
			<div key="afterbugfix"></div>
		</template>
		<!-- 加载中显示 -->
		<template v-show="loading">
			<slot>
				<!-- 默认使用absolute定位 -->
				<div class="ba-load__loading"><ba-loading></ba-loading></div>
			</slot>
		</template>
		<slot name="error"><div class="ba-load__error"></div></slot>
	</div>
</template>

<script>
/**
 * 状态型组件
 *
 * loading: 是否正在加载
 *
 * // 结合request
 * error: { type: empty error network timeout, message: '' }
 */
export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		/**
		 * 错误
		 * String: 错误信息，使用默认错误类型, '': 无措
		 * Object: { type, message }, type: 错误类型, message: 错误信息, null: 无错
		 * Boolean: true 使用默认的错误, false, 无措
		 */
		error: {
			type: [String, Object, Boolean],
			default: false
		},
		// 内容隐藏时机
		contentHideHook: {
			type: String,
			default: 'error',
			validator(v) {
				// loading: loading状态和error状态都隐藏
				// 【默认】 error: 仅在error状态是隐藏
				// 
				return ['always'].includes(v);
			}
		}
	},
	data() {
		return {};
	},
	watch: {
		// loading 和 error 是互斥的，总会有一个为真，一个为假
		loading(v) {
			if (v) {
				this.error = null;
			}
		},
		error(v) {
			if (v) {
				this.loading = false;
			}
		}
	}
};
</script>

<style></style>
