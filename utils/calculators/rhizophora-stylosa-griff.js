import Decimal from 'decimal.js';
import config from "../config.js"
//#红海榄
export default class RhizophoraStylosaGriff {
	#dbh;
	#height;
	constructor(dbh,height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	calc() {
		const whole = new Decimal(0.1719).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(1.0254));
		return {
			whole: whole.toFixed(config.digitLen)
		}
	}
}