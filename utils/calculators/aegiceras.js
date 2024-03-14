import Decimal from 'decimal.js';
import config from "../config.js"
//#桐花树
export default class Aegiceras {
	#dbh;
	#height;
	#rate = 0.44
	constructor(dbh, height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	calc() {
		this.validator();
		if (this.#height && this.#height < 2) {
			//高度小于2
			return this.calcSeparate();
		} else {
			return this.calcWhole();
		}
	}
	calcSeparate() {
		const top = new Decimal(0.02039).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(0.83749));
		const bottom = top.dividedBy(7)
		return {
			top: top.toFixed(config.digitLen),
			bottom: bottom.toFixed(config.digitLen),
			cf: this.calcCf(top,bottom)
		}
	}
	calcWhole() {
		const whole = new Decimal(0.780778).times(this.#dbh).minus(0.325215);
		return {
			whole: whole.toFixed(config.digitLen),
			cf: this.calcCf(whole)
		}
	}
	calcCf(...nums){
		let total = new Decimal(0);
		nums.forEach(num=>{
			total = total.plus(num)
		})
		return total.times(this.#rate).toFixed(config.digitLen);
	}
	validator() {
		if (!this.#dbh) {
			throw new Error("请输入胸径/基径");
		}
		if (!this.#height) {
			throw new Error("请输入树高");
		}
	}
}