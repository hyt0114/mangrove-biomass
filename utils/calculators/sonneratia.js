import Decimal from 'decimal.js';
import config from "../config.js"
//#海桑属
export default class Sonneratia  {
	#dbh;
	#height;
	constructor(dbh,height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	calc() {
		const whole = new Decimal(0.08469).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(0.8532));
		return {
			whole: whole.toFixed(config.digitLen)
		}
	}
}