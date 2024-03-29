<template>
	<view class="flex">
		<uni-easyinput placeholder="请输入" type="digit" v-model="modelValue" @input="onInputChange"></uni-easyinput>
		<view v-if="suffix" class="flex flex-shrink-0 items-center justify-center suffix"><view class="suffix-wrap">{{suffix}}<view class="pow" v-if="pow">{{pow}}</view></view></view>
	</view>
</template>

<script>
	export default {
		props: {
			suffix: {
				type: String,
				default: ''
			},
			pow:{
				type: String,
				default: ''
			},
			value: {
				type: [String, Number],
				default: null
			}
		},
		data() {
			return {
				modelValue: null
			}
		},
		watch: {
			value: {
				handler(v) {
					this.modelValue = v;
				},
				immediate: true
			}
		},
		methods: {
			onInputChange(e) {
				this.$emit("update:value", e);
			}
		},
		options:{
			styleIsolation:"shared"
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		::v-deep .uni-easyinput__content {
			border-top-right-radius: 0 !important;
			border-bottom-right-radius: 0 !important;
			border-right: 0 !important;
		}
	}
	.suffix{
		width: 3.5rem;
		color:#666;
		background-color: #f0f0f0;
		border-top-right-radius: 0.25rem !important;
		border-bottom-right-radius: 0.25rem !important;
		border-top:0.0625rem solid #dcdfe6;
		border-right:0.0625rem solid #dcdfe6;
		border-bottom:0.0625rem solid #dcdfe6;
		font-size: 14px;
		&-wrap{
			position: relative;
			width: fit-content;
			.pow{
				position: absolute;
				top:-20%;
				left:100%;
				font-size: 12px;
			}
		}
		
	}
</style>