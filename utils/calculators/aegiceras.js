import Decimal from 'decimal.js';
import config from "../config.js";
import {
	shapeEnums
} from "../enums.js";
//#桐花树
export default class Aegiceras {
	#dbh;
	#basal;
	#height;
	#shape;
	#rate = 0.44
	constructor(dbh, basal, height) {
		this.#dbh = dbh;
		this.#basal = basal;
		this.#height = height;
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		if (this.#shape == shapeEnums.MACROPHANEROPHYTES.value) {
			return this.calcByMacrophanerophytes();
		} else if (this.#shape == shapeEnums.SMALL_MACROPHANEROPHYTES.value) {
			return this.calcBySmallMacrophanerophytes();
		} else if (this.#shape == shapeEnums.UNDERGROWTH.value) {
			return this.calcByUndergrowth();
		}
		return {}
	}
	//乔木
	calcByMacrophanerophytes() {
		const wa = new Decimal(10).pow(new Decimal(1.496).plus(new Decimal(0.465).times(Decimal.log10(new Decimal(
			this.#dbh).dividedBy(10).pow(2).times(this.#height)))));
		const wb = new Decimal(10).pow(new Decimal(0.967).plus(new Decimal(0.303).times(Decimal.log10(new Decimal(
			this.#dbh).dividedBy(10).pow(2).times(this.#height)))));
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb: this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	//小乔木
	calcBySmallMacrophanerophytes() {
		const wa = new Decimal(0.644347).times(this.#dbh).minus(0.425066);
		const wb = new Decimal(0.163242).times(this.#dbh).minus(0.10423);
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb: this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	//矮灌木
	calcByUndergrowth() {
		const wa = new Decimal(0.02039).times(new Decimal(this.#basal).pow(2).times(this.#height).pow(0.83749));
		return {
			wa: wa.toFixed(config.digitLen),
			wt: wa.toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cf: this.calcCf(wa),
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
		if (!this.#dbh && (this.#shape == shapeEnums.MACROPHANEROPHYTES.value || this.#shape == shapeEnums
				.SMALL_MACROPHANEROPHYTES.value)) {
			throw new Error("请输入胸径");
		}
		if (!this.#basal && this.#shape == shapeEnums.UNDERGROWTH.value) {
			throw new Error("请输入基径");
		}
		if (!this.#height && this.#shape != shapeEnums.SMALL_MACROPHANEROPHYTES.value) {
			throw new Error("请输入树高");
		}
	}
}