<template>
	<view class="content">
		<uni-forms label-align="right" label-width="5rem">
			<uni-forms-item label="树种" name='kind'>
				<uni-data-picker v-model="formData.kind" :localdata="mangroveKinds" popup-title="请选择"
					@change="onKindChange"></uni-data-picker>
			</uni-forms-item>
			<template v-if="formData.kind">
				<uni-forms-item label="树形" name='shape'>
					<uni-data-picker v-model="formData.shape" :localdata="shapes" popup-title="请选择"
						@change="onShapeChange" :clear-icon="false"></uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="胸径" name='dbh' v-if="showFields.dbh">
					<FormInput v-model:value="formData.dbh" suffix="cm" />
					<view class="form-tip" v-if="dbhHelpText">{{dbhHelpText}}</view>
				</uni-forms-item>
				<uni-forms-item label="基径" name='basal' v-if="showFields.basal">
					<FormInput v-model:value="formData.basal" suffix="cm" />
					<view class="form-tip" v-if="dbhHelpText">{{dbhHelpText}}</view>
				</uni-forms-item>
				<uni-forms-item label="冠幅" name='crown'  v-if="showFields.crown">
					<FormInput v-model:value="formData.crown" suffix="m2" />
				</uni-forms-item>
				<uni-forms-item label="树高" name='height'  v-if="showFields.height">
					<FormInput v-model:value="formData.height" suffix="m" />
				</uni-forms-item>
				<uni-forms-item label="密度" name='density'  v-if="showFields.density">
					<FormInput v-model:value="formData.density" suffix="g/m3" />
				</uni-forms-item>
			</template>

			<template v-if="needCalcType">
				<view class="btn-group">
					<button  @click="calcBiomass(false)" class="btn-primary">使用胸径计算</button>
					<button  @click="calcBiomass(true)" class="btn-success" >使用基径计算</button>
				</view>
			</template>
			<template v-else><button @click="calcBiomass(false)" class="btn-primary">计算</button></template>

		</uni-forms>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" :showClose="false" confirmText="确定" title="计算结果">
				<view class="dialog-content">
					<view v-if="calcResult.hasOwnProperty('wt')"><text>总量：{{calcResult.wt}}</text> <text
							class="text-muted ml-5">kg DW</text></view>
					<view v-if="calcResult.hasOwnProperty('wa')"><text>地上部：{{calcResult.wa}}</text> <text
							class="text-muted ml-5">kg DW</text></view>
					<view v-if="calcResult.hasOwnProperty('wb')"><text>地下部：{{calcResult.wb}}</text> <text
							class="text-muted ml-5">kg DW</text></view>
					<view v-if="calcResult.hasOwnProperty('cf')"><text>含碳率：{{calcResult.cf}}</text> <text
							class="text-muted ml-5">Kg C</text></view>
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
		getDbhHelpText,
		getTreeShapes,
		getFormFields,
		getNeedCalcType
	} from '/utils/form-utils.js'
	import calc from "/utils/calculators/index.js"
	export default {
		data() {
			return {
				formData: {
					kind: null,
					shape: null,
					dbh: null,
					basal: null,
					height: null,
					density: null,
					crown: null
				},
				dbhHelpText: "",
				mangroveKinds: mangroveKinds,
				calcResult: {},
				errorMessage: "",
				shapes: [],
				showFields: {
					dbh: false,
					basal: false,
					height: false,
					density: false,
					crown: false
				},
				needCalcType: false
			}
		},
		onLoad() {

		},
		methods: {
			onKindChange(e) {
				const selectKinds = e.detail.value;
				if (selectKinds && selectKinds.length) {
					const kind = selectKinds[0];
					this.dbhHelpText = getDbhHelpText(kind.value);
					this.shapes = getTreeShapes(kind.value);
					this.needCalcType = getNeedCalcType(kind.value);
					if (this.shapes && this.shapes.length) {
						this.formData.shape = this.shapes[0].value;
						const fields = getFormFields(this.formData.kind, this.formData.shape);
						if (fields && fields.length) {
							for (let key in this.showFields) {
								this.showFields[key] = fields.includes(key);
							}
						}
					}
				} else {
					this.dbhHelpText = "";
					this.shapes = [],
						this.formData.shape = null;
					this.formData.dbh = null;
					this.formData.basal = null;
					this.formData.height = null;
					this.formData.density = null;
					this.formData.crown = null;
				}
			},
			onShapeChange(e) {
				const selectShapes = e.detail.value;
				if (selectShapes && selectShapes.length) {
					const fields = getFormFields(this.formData.kind, selectShapes[0].value);
					if (fields && fields.length) {
						for (let key in this.showFields) {
							this.showFields[key] = fields.includes(key);
						}
					}
				}
			},
			calcBiomass(byBasal) {
				//计算
				if (!this.formData.kind) {
					this.errorMessage = "请选择树种";
					this.$refs.message.open();
					return;
				}
				try {
					
					this.calcResult = calc({
						type: this.formData.kind,
						shape: this.formData.shape,
						dbh: this.formData.dbh,
						basal: this.formData.basal,
						height: this.formData.height,
						density: this.formData.density,
						crown: this.formData.crown,
						exts: byBasal ? {
							byBasal: true
						} : null
					});
					if (this.calcResult) {
						this.$refs.alertDialog.open();
					} else {
						this.errorMessage = "未知错误";
						this.$refs.message.open()
					}
				} catch (e) {
					this.errorMessage = e.message || "参数错误";
					this.$refs.message.open();
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
		height: 100%;
		width: 100%;
		overflow-y: auto;
		background:linear-gradient(135deg,#fff 40%,#8cde9b);
		box-sizing: border-box;
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
	.btn-group{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.btn-primary{
		background-color: #2979ff;
		color: #fff;
	}
	.btn-success{
		background-color: #18bc37;
		color: #fff;
	}
</style>