<template>
	<view class="content">
		<uni-forms label-align="right" label-width="5rem">
			<uni-forms-item label="树种" name='kind'>
				<uni-data-picker v-model="formData.kind" :localdata="mangroveKinds" popup-title="请选择"
					@change="onKindChange"></uni-data-picker>
			</uni-forms-item>
			<uni-forms-item label="胸径/基径" name='dbh'>
				<FormInput v-model:value="formData.dbh" suffix="cm" />
				<view class="form-tip" v-if="dbhHelpText">{{dbhHelpText}}</view>
			</uni-forms-item>
			<uni-forms-item label="树高" name='height'>
				<FormInput v-model:value="formData.height" suffix="m" />
			</uni-forms-item>
			<uni-forms-item label="密度" name='density' v-if="formData.kind === -1 || formData.kind === 9 || formData.kind === 10">
				<FormInput v-model:value="formData.density" suffix="g/m3" />
			</uni-forms-item>
			<button type="primary" @click="calcBiomass">计算</button>
		</uni-forms>
		<!-- <uni-popup ref="popup">
			<view class="popup-content">
				<view v-if="calcResult.whole">总量：{{calcResult.whole}}</view>
				<view v-if="calcResult.top">地上部：{{calcResult.top}}</view>
				<view v-if="calcResult.bottom">地下部：{{calcResult.bottom}}</view>
			</view>
		</uni-popup> -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" :showClose ="false" confirmText="确定" title="计算结果" >
				<view class="dialog-content">
					<view v-if="calcResult.hasOwnProperty('whole')"><text>总量：{{calcResult.whole}}</text> <text class="text-muted ml-5">kg DW</text></view>
					<view v-if="calcResult.hasOwnProperty('top')"><text>地上部：{{calcResult.top}}</text> <text class="text-muted ml-5">kg DW</text></view>
					<view v-if="calcResult.hasOwnProperty('bottom')"><text>地下部：{{calcResult.bottom}}</text> <text class="text-muted ml-5">kg DW</text></view>
				</view>
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="message" type="message">
			<uni-popup-message type="error" :message="errorMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mangroveKinds
	} from '/utils/tree-kinds.js';
	import FormInput from "/components/common/FormInput.vue";
	import {
		getDbhHelpText
	} from '/utils/form-utils.js'
	import calc from "/utils/calculators/index.js"
	export default {
		data() {
			return {
				formData: {
					kind: null,
					dbh: null,
					height: null,
					density: null
				},
				dbhHelpText: "",
				mangroveKinds: mangroveKinds,
				calcResult: {},
				errorMessage:""
			}
		},
		onLoad() {

		},
		methods: {
			onKindChange(e) {
				const v = e.detail.value;
				if (v && v.length) {
					this.dbhHelpText = getDbhHelpText(v[0].value);
				} else {
					this.dbhHelpText = "";
				}
			},
			calcBiomass() {
				//计算
				if(!this.formData.kind){
					this.errorMessage = "请选择树种";
					this.$refs.message.open();
					return;
				}
				this.calcResult = calc(this.formData.kind, this.formData.dbh, this.formData.height, this.formData.density);
				if (this.calcResult) {
					this.$refs.alertDialog.open();
				} else {
					this.errorMessage = "未知错误";
					this.$refs.message.open()
				}

			}
		},
		components: {
			FormInput
		}
	}
</script>

<style scoped lang="scss">
	.content {
		padding: 10px;

		.form-tip {
			font-size: 12px;
			color: #999;
			margin-top: 3px;
		}

		.dialog-content {
			padding: 10px;
			border-radius: 12px;
			background-color: #fff;
		}
	}
</style>