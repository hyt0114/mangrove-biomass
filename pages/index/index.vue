<template>
	<page-meta :page-style="'overflow:'+(hasPoper?'hidden':'visible')"></page-meta>
	<view class="content">
		<uni-forms label-align="right" label-width="5rem">
			<view class="tree-kind-wrap">
				<uni-forms-item label="树种" name='kind'>
					<view class="search-input-wrap">
						<view class="search-input-wrap-text" @click="openTreeKindSelector">{{formData.kindText}}</view>
						<uni-icons type="clear" size="22" color="rgb(192, 196, 204)" class="search-input-wrap-icon mr-5"
							v-if="formData.kindText" @click="onKindChange(null)"></uni-icons>
						<uni-icons type="search" size="22" color="rgb(192, 196, 204)" class="search-input-wrap-icon"
							@click="openTreeKindSelector"></uni-icons>
					</view>
				</uni-forms-item>
			</view>
			<uni-forms-item label=" " v-if="formData.previewImg">
				<image :src="formData.previewImg" class="tree-img-preview" @click="onPreviewImg"></image>
			</uni-forms-item>
			<template v-if="formData.kind">
				<uni-forms-item label="树形" name='shape'>
					<uni-data-picker v-model="formData.shape" :localdata="shapes" popup-title="请选择" :clear-icon="false"
						@change="onShapeChange" @popupopened="onPopupStatusChange(true)"
						@popupclosed="onPopupStatusChange(false)"></uni-data-picker>
				</uni-forms-item>
				<uni-forms-item label="胸径" name='dbh' v-if="showFields.dbh">
					<FormInput v-model:value="formData.dbh" suffix="cm" />
					<view class="form-tip" v-if="dbhHelpText">{{dbhHelpText}}</view>
				</uni-forms-item>
				<uni-forms-item label="基径" name='basal' v-if="showFields.basal">
					<FormInput v-model:value="formData.basal" suffix="cm" />
					<view class="form-tip" v-if="dbhHelpText">{{dbhHelpText}}</view>
				</uni-forms-item>
				<uni-forms-item label="冠幅" name='crown' v-if="showFields.crown">
					<FormInput v-model:value="formData.crown" suffix="m" pow="2" />
				</uni-forms-item>
				<uni-forms-item label="树高" name='height' v-if="showFields.height">
					<FormInput v-model:value="formData.height" suffix="m" />
				</uni-forms-item>
				<uni-forms-item label="密度" name='density' v-if="showFields.density">
					<FormInput v-model:value="formData.density" suffix="g.cm" pow="3" />
					<view class="form-helper" @click="onPopDensityList">
						<view class="form-helper-text">查看常见木材密度</view>
						<image src="/static/img/search.png" class="search-icon"></image>
					</view>
				</uni-forms-item>
			</template>
			<view class="mt-20">
				<template v-if="needCalcType">
					<view class="btn-group">
						<button @click="calcBiomass(false)" class="btn btn-success">使用胸径计算</button>
						<button @click="calcBiomass(true)" class="btn btn-primary">使用基径计算</button>
					</view>
				</template>
				<template v-else><button @click="calcBiomass(false)" class="btn btn-success lg">计算</button></template>
			</view>
		</uni-forms>
		<uni-popup ref="treeKindSelector" type="bottom" :safe-area="false" @change="e=>onPopupStatusChange(e.show)">
			<view class="popup-content" style="height: 66vh;">
				<view class="popup-content-title">
					<view class="title-text">请选择</view>
					<image src="/static/img/close.png" class="title-close-btn" @click="closeTreeKindSelector"></image>
				</view>
				<scroll-view scroll-y class="popup-content-scroll" enable-flex>
					<view class="d-grid">
						<view v-for="(item,index) in mangroveKinds" :key="index" class="grid-block"
							@click="onKindChange(item.value,item.text,item.img)">
							<image :src="item.img" class="tree-img"></image>
							<view class="tree-text">{{item.text}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="resultPopup" type="bottom" :safe-area="false" @change="e=>onPopupStatusChange(e.show)">
			<view class="popup-content">
				<view class="popup-content-title">
					<view class="title-text">计算结果</view>
					<image src="/static/img/close.png" class="title-close-btn" @click="closePopup"></image>
				</view>
				<view class="popup-content-main">
					<view v-if="handleResultShowField('wa')" class="result-field-line">
						<view class="result-field-line-label">地上部生物量</view>
						<view class="result-field-line-text ">{{calcResult.wa}}</view>
						<view class="result-field-line-unit">kg DW</view>
					</view>
					<view v-if="handleResultShowField('ca')" class="result-field-line">
						<view class="result-field-line-label">地上部碳含量</view>
						<view class="result-field-line-text coffee">{{calcResult.ca}}</view>
						<view class="result-field-line-unit">kg C</view>
					</view>
					<view v-if="handleResultShowField('wb')" class="result-field-line">
						<view class="result-field-line-label">地下部生物量</view>
						<view class="result-field-line-text">{{calcResult.wb}}</view>
						<view class="result-field-line-unit">kg DW</view>
					</view>
					<view v-if="handleResultShowField('cb')" class="result-field-line">
						<view class="result-field-line-label">地下部碳含量</view>
						<view class="result-field-line-text coffee">{{calcResult.cb}}</view>
						<view class="result-field-line-unit">kg C</view>
					</view>
					<view v-if="handleResultShowField('wt')" class="result-field-line">
						<view class="result-field-line-label">总生物量</view>
						<view class="result-field-line-text">{{calcResult.wt}}</view>
						<view class="result-field-line-unit">kg DW</view>
					</view>
					<view v-if="handleResultShowField('cf')" class="result-field-line">
						<view class="result-field-line-label">总碳含量</view>
						<view class="result-field-line-text coffee">{{calcResult.cf}}</view>
						<view class="result-field-line-unit">kg C</view>
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="densityPopup" type="bottom" :safe-area="false" @change="e=>onPopupStatusChange(e.show)">
			<view class="popup-content">
				<view class="popup-content-title">
					<view class="title-text">常见木材密度(g·cm3)</view>
					<image src="/static/img/close.png" class="title-close-btn" @click="closeDensityPopup"></image>
				</view>
				<scroll-view scroll-y class="popup-content-scroll" enable-flex>
					<view v-for="(item,index) in densities" :key="index" class="scroll-field-line">
						<view class="scroll-field-line-label">{{item.text}}</view>
						<view class="scroll-field-line-text">{{item.value}}</view>
						<view class="scroll-field-line-copy" @click="onUseDensity(item.value)">使用</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="message" type="message">
			<uni-popup-message type="error" :message="errorMessage" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mangroveKinds
	} from '/utils/calculators';
	import FormInput from "/components/common/FormInput.vue";
	import {
		getDbhHelpText,
		getTreeShapes,
		getFormFields,
		getNeedCalcType
	} from '/utils/form-utils.js'
	import {
		calc
	} from "/utils/calculators";
	import {
		densities
	} from "/utils/enums.js";
	export default {
		data() {
			return {
				formData: {
					kind: null,
					kindText: "",
					previewImg: null,
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
				needCalcType: false,
				densities: densities,
				hasPoper: false
			}
		},
		onLoad() {

		},
		methods: {
			openTreeKindSelector() {
				this.$refs.treeKindSelector.open();
			},
			closeTreeKindSelector() {
				this.$refs.treeKindSelector.close();
			},
			onKindChange(kind, text, img) {
				if (kind) {
					this.formData.kind = kind;
					this.formData.kindText = text;
					this.formData.previewImg = img;
					this.dbhHelpText = getDbhHelpText(kind);
					const treeShapes = getTreeShapes(kind);
					this.needCalcType = getNeedCalcType(kind);
					if (treeShapes && treeShapes.length) {
						this.shapes = treeShapes.map(item => {
							return {
								text: item.text + (item.tip ? `（${item.tip}）` : ""),
								value: item.value
							}
						})
						this.formData.shape = treeShapes[0].value;
						const fields = getFormFields(this.formData.kind, this.formData.shape);
						if (fields && fields.length) {
							for (let key in this.showFields) {
								this.showFields[key] = fields.includes(key);
							}
						}
					}
				} else {
					this.dbhHelpText = "";
					this.shapes = [];
					this.formData.kind = null;
					this.formData.kindText = "";
					this.formData.previewImg = null;
					this.formData.shape = null;
					this.formData.dbh = null;
					this.formData.basal = null;
					this.formData.height = null;
					this.formData.density = null;
					this.formData.crown = null;
					this.needCalcType = false;
				}
				this.closeTreeKindSelector();
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
						this.$refs.resultPopup.open();
					} else {
						this.errorMessage = "未知错误";
						this.$refs.message.open()
					}
				} catch (e) {
					this.errorMessage = e.message || "参数错误";
					this.$refs.message.open();
				}
			},
			handleResultShowField(field) {
				return this.calcResult.hasOwnProperty(field);
			},
			closePopup() {
				this.$refs.resultPopup.close();
			},
			onPopDensityList() {
				this.$refs.densityPopup.open();
			},
			closeDensityPopup() {
				this.$refs.densityPopup.close();
			},
			onUseDensity(text) {
				this.formData.density = text;
				this.closeDensityPopup();
			},
			onPopupStatusChange(show) {
				this.hasPoper = show;
			},
			onPreviewImg() {
				// #ifdef APP-PLUS
				uni.previewImage({
					urls: [this.formData.previewImg],
				})
				// #endif
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
		background: linear-gradient(135deg, #fff 40%, #8cde9b);
		box-sizing: border-box;

		.bg-white {
			::v-deep .uni-easyinput__content {
				background-color: #fff !important;
			}
		}

		.form-tip {
			font-size: 12px;
			color: #999;
			margin-top: 3px;
		}

		.form-helper {
			display: flex;
			align-items: center;
			margin-top: 5px;

			&-text {
				font-size: 12px;
				color: #2979ff;
				margin-right: 5px;
			}

			.search-icon {
				width: 12px;
				height: 12px;
			}
		}

		::v-deep .selected-item-active {
			color: #2979ff;
		}

		.popup-content {
			height: 55vh;
			border-top-left-radius: 22px;
			border-top-right-radius: 22px;
			background-color: #fff;
			padding-bottom: 60px;
			box-sizing: border-box;
			background: linear-gradient(135deg, #fff 70%, #8cde9b);

			.popup-content-title {
				height: 38px;
				font-size: 16px;
				border-bottom: 1px solid #f0f0f0;
				display: flex;
				align-items: center;
				position: relative;

				.title-text {
					flex: 1;
					text-align: center;
					font-weight: bold;
				}

				.title-close-btn {
					width: 38px;
					height: 38px;
					position: absolute;
					right: 0;
					top: 0;
				}
			}

			.popup-content-main {
				padding: 15px 10px;
				box-sizing: border-box;
				height: 100%;

				.result-field-line {
					display: flex;
					align-items: center;
					height: 40px;
					border-bottom: 1px solid #f0f0f0;

					&-label {
						width: 120px;
						text-align: right;
						color: #666;
						margin-right: 5px;

						&::after {
							content: "：";
						}
					}

					&-text {
						flex: 1;
						color: #18bc37;
						font-weight: bold;
						display: flex;
						justify-content: flex-end;
						margin-right: 20px;

						&.coffee {
							color: saddlebrown;
						}
					}

					&-unit {
						width: 50px;
						font-size: 12px;
						background-color: #f0f0f0;
						padding: 4px 8px;
						color: #666;
						border-radius: 4px;
						flex-shrink: 0;
						text-align: center;
					}
				}
			}

			.popup-content-scroll {
				height: 100%;

				.scroll-field-line {
					display: flex;
					align-items: center;
					height: 42px;
					border-bottom: 1px solid #f0f0f0;
					padding: 0 10px;

					&-label {
						color: #666;
					}

					&-text {
						flex: 1;
						color: #2979ff;
						display: flex;
						font-weight: bold;
						justify-content: flex-end;
						margin-right: 20px;
					}

					&-copy {
						width: 50px;
						font-size: 12px;
						background-color: #f0f0f0;
						padding: 4px 8px;
						color: #fff;
						background-color: #18bc37;
						border-radius: 4px;
						flex-shrink: 0;
						text-align: center;
					}
				}
			}
		}

	}

	.btn-group {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;

		.btn {
			flex: 1;
		}
	}

	.btn {
		font-size: 15px;
		height: 40px;
		border-radius: 40px;

		&::after {
			display: none;
		}

		&.lg {
			width: 80%;
		}

	}

	.btn-primary {
		color: #2979ff;
		background-color: #fff;
		border: 1px solid #2979ff;
	}

	.btn-success {
		color: #18bc37;
		background-color: #fff;
		border: 1px solid #18bc37;

	}

	.d-grid {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		padding: 10px 0;
		grid-row-gap: 10px;

		.grid-block {
			display: flex;
			flex-direction: column;
			align-items: center;

			.tree-img {
				width: 80px;
				height: 80px;
				border-radius: 10px;
			}

			.tree-text {
				margin-top: 5px;
				color: #666;
				font-size: 12px;
			}
		}
	}

	.search-input-wrap {
		display: flex;
		width: 100%;
		border: 0.0625rem solid #e5e5e5;
		border-radius: 0.3125rem;
		height: 2.1875rem;
		align-items: center;
		overflow: hidden;
		padding: 0 0.625rem;
		box-sizing: border-box;

		&-text {
			flex: 1;
			height: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			color: #333;
			display: flex;
			align-items: center;
		}

		&-icon {
			width: 22px;
			flex-shrink: 0;
		}
	}

	.tree-kind-wrap {
		::v-deep .uni-forms-item{
			margin-bottom: 5px !important;
		}
		::v-deep .uni-forms-item__content {
			overflow: hidden;
		}
	}

	.mr-5 {
		margin-right: 5px;
	}

	.mt-20 {
		margin-top: 20px;
	}

	.tree-img-preview {
		width: 60px;
		height: 60px;
		border-radius: 10px;
	}
</style>