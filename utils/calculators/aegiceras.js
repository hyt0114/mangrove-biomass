import Decimal from 'decimal.js';
import config from "../config.js"
//#桐花树
export default class Aegiceras {
	#dbh;
	#height;
	constructor(dbh, height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	calc() {
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
		}
	}
	calcWhole() {
		const whole = new Decimal(0.780778).times(this.#dbh).minus(0.325215);
		return {
			whole: whole.toFixed(config.digitLen)
		}
	}
}