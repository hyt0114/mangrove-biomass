import Decimal from 'decimal.js';
import config from "../config.js"
import {
	shapeEnums
} from "../enums.js"
//#木榄、海莲，尖瓣海莲
export default class BruguieraGymnorrhiza {
	#dbh;
	#basal;
	#height;
	#shape;
	#rate = 0.46;
	constructor(dbh, basal, height) {
		this.#dbh = dbh;
		this.#basal = basal;
		this.#height = height;
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc(exts) {
		if (exts && exts.byBasal) {
			return this.calcByBasal();
		} else {
			return this.calcByDbh();
		}
	}
	//基径计算
	calcByBasal() {
		const wa = new Decimal(this.#basal).pow(2).times(this.#height).pow(0.5918).times(0.1246);
		const wb = wa.times(0.8132);
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb: this.calcCf(wb),
			cf: this.calcCf(wa, wb)
		}
	}
	//胸径计算
	calcByDbh() {
		const wa = new Decimal(this.#dbh).pow(2.31).times(0.186);
		const wb = new Decimal(this.#dbh).pow(1.5543).times(0.4697);
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb: this.calcCf(wb),
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
	validate(exts) {
		if (!this.#dbh && (!exts || !exts.byBasal)) {
			throw new Error("请输入胸径");
		}
		if (!this.#basal && exts && exts.byBasal) {
			throw new Error("请输入基径");
		}
		if (!this.#height && exts && exts.byBasal) {
			throw new Error("请输入树高");
		}
	}
}