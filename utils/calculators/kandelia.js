import Decimal from 'decimal.js';
import config from "../config.js";
import {
	shapeEnums
} from "../enums.js";
//#秋茄
export default class Kandelia {
	#dbh;
	#basal;
	#height;
	#shape;
	#rate = 0.47;
	constructor(dbh, basal, height) {
		this.#dbh = dbh;
		this.#basal = basal;
		this.#height = height;
	}
	static config = {
		text: "秋茄",
		value: 2,
		dbhHelpText: "请输入4-15之间的小数",
		shapes: [{
				...shapeEnums.MACROPHANEROPHYTES,
				tip: "建议树高3米以上"
			}, {
				...shapeEnums.UNDERGROWTH,
				tip: "建议树高1.3米以下 "
			}, {
				...shapeEnums.SMALL_MACROPHANEROPHYTES,
				tip: "建议树高1.5米左右"
			},
			{
				...shapeEnums.YOUNG,
				tip: "建议树高2米以下 "
			}
		],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
			[shapeEnums.UNDERGROWTH.value]: [
				"basal"
			],
			[shapeEnums.SMALL_MACROPHANEROPHYTES.value]: [
				"basal", "height"
			],
			[shapeEnums.YOUNG.value]: [
				"basal"
			]
		},
		img: "/static/img/trees/kandelia.jpg"
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		if (this.#shape == shapeEnums.MACROPHANEROPHYTES.value) {
			return this.calcByMacrophanerophytes();
		}else if (this.#shape == shapeEnums.UNDERGROWTH.value) {
			return this.calcByUndergrowth();
		} else if (this.#shape == shapeEnums.SMALL_MACROPHANEROPHYTES.value) {
			return this.calcBySmallMacrophanerophytes();
		} else if (this.#shape == shapeEnums.YOUNG.value) {
			return this.calcByYoung();
		} 
		return {}
	}
	//乔木
	calcByMacrophanerophytes(){
		const wa = new Decimal(10).pow(new Decimal(1.053).times(Decimal.log10(new Decimal(this.#dbh).dividedBy(100).pow(2).times(this.#height))).plus(2.814));
		const wb = new Decimal(10).pow(new Decimal(0.990).times(Decimal.log10(new Decimal(this.#dbh).dividedBy(100).pow(2).times(this.#height))).plus(2.433));
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb:this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	//矮灌木
	calcByUndergrowth(){
		const wt = new Decimal(this.#basal).times(10).pow(1.446).times(3.614).dividedBy(1000);
		const wb = new Decimal(this.#basal).times(10).pow(1.136).times(4.6).dividedBy(1000);
		return {
			wt: wt.toFixed(config.digitLen),
			wa: wt.minus(wb).toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			cb:this.calcCf(wb),
			cf: this.calcCf(wt),
			ca:  this.calcCf(wt.minus(wb)),
		}
	}
	//小乔木
	calcBySmallMacrophanerophytes(){
		const wa = new Decimal(0.05698).times(new Decimal(this.#basal).pow(2)).minus(0.295595);
		const wb = new Decimal(0.009685).times(new Decimal(this.#basal).pow(2).times(this.#height)).plus(0.108358);
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb:this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	//幼龄植株
	calcByYoung(){
		const wa = new Decimal(this.#basal).pow(2.454).times(10.16).dividedBy(1000);
		const wb = new Decimal(this.#basal).pow(2.064).times(7.649).dividedBy(1000);
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb:this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	calcCf(...nums) {
		let total = new Decimal(0);
		nums.forEach(num => {
			total = total.plus(num)
		})
		return total.times(this.#rate).toFixed(config.digitLen);
	}
	validate() {
		if (!this.#dbh && this.#shape == shapeEnums.MACROPHANEROPHYTES.value) {
			throw new Error("请输入胸径");
		}
		if(!this.#basal && this.#shape != shapeEnums.MACROPHANEROPHYTES.value){
			throw new Error("请输入基径");
		}
		if (!this.#height && (this.#shape == shapeEnums.MACROPHANEROPHYTES.value || this.#shape == shapeEnums.SMALL_MACROPHANEROPHYTES.value)) {
			throw new Error("请输入树高");
		}
	}
}