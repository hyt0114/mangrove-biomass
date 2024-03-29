import Decimal from 'decimal.js';
import config from "../config.js"
import {
	shapeEnums
} from "../enums.js"
//#白骨壤
export default class Avicennia {
	#dbh;
	#basal;
	#height;
	#crown;
	#rate = 0.41
	#shape = shapeEnums.MACROPHANEROPHYTES.value
	constructor(dbh, basal, height, crown) {
		this.#dbh = dbh;
		this.#basal = basal;
		this.#height = height;
		this.#crown = crown;
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		if (this.#shape == shapeEnums.MACROPHANEROPHYTES.value) {
			return this.calcByMacrophanerophytes();
		} else if (this.#shape = shapeEnums.SHRUB.value) {
			return this.calcByShrub();
		}
		return {}
	}
	//计算乔木
	calcByMacrophanerophytes() {
		const wa = new Decimal(10).pow(new Decimal(2.092).plus(new Decimal(0.529).times(Decimal.log10(
			new Decimal(this.#dbh).dividedBy(10).pow(2).times(this.#height)))));
		const wb = new Decimal(1.361).plus(new Decimal(0.615).times(Decimal.log10(new Decimal(this.#dbh).dividedBy(10).pow(
			2).times(this.#height))));
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb: this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	//计算灌木
	calcByShrub() {
		if (this.#crown && this.#crown > 0) {
			const wa = new Decimal(0.00801).times(this.#height).dividedBy(Decimal.ln(this.#height))
				.plus(new Decimal(1.4796).times(this.#crown))
				.plus(new Decimal(this.#basal).pow(2).times(0.0991)).minus(2.4386);
			const wb = wa.plus(0.96);
			return {
				wa: wa.toFixed(config.digitLen),
				wb: wb.toFixed(config.digitLen),
				wt: wa.plus(wb).toFixed(config.digitLen),
				ca: this.calcCf(wa),
				cb: this.calcCf(wb),
				cf: this.calcCf(wa, wb)
			}
		} else {
			const wa = new Decimal(0.076123).times(new Decimal(this.#basal).pow(2).times(this.#height)).minus(0.222424);
			const wb = new Decimal(0.040168).times(new Decimal(this.#basal).pow(2).times(this.#height)).minus(0.12623);
			return {
				wa: wa.toFixed(config.digitLen),
				wb: wb.toFixed(config.digitLen),
				wt: wa.plus(wb).toFixed(config.digitLen),
				ca: this.calcCf(wa),
				cb: this.calcCf(wb),
				cf: this.calcCf(wa, wb)
			}
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
		if (!this.#basal && this.#shape == shapeEnums.SHRUB.value) {
			throw new Error("请输入基径");
		}
		if (!this.#height) {
			throw new Error("请输入树高");
		}
	}
}