import Decimal from 'decimal.js';
import config from "../config.js"
//#角木果
export default class CeriopsTagal  {
	#dbh;
	constructor(dbh) {
		this.#dbh = dbh;
	}
	calc() {
		const whole = new Decimal(0.5199).times(new Decimal(this.#dbh).pow(1.953));
		return {
			whole: whole.toFixed(config.digitLen)
		}
	}
}