import Decimal from 'decimal.js';
import config from "../config.js"
//#白骨壤
export default class Avicennia {
	#dbh;
	constructor(dbh) {
		this.#dbh = dbh;
	}
	calc() {
		const whole = new Decimal(1.5066).times(new Decimal(this.#dbh).pow(1.595));
		return {
			whole: whole.toFixed(config.digitLen)
		}
	}
}