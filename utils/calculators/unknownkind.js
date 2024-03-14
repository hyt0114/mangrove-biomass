import Decimal from 'decimal.js';
import config from "../config.js"
//#通用方程
export default class UnknownKind {
	
	#dbh;
	#density;
	constructor(dbh, density) {
		this.#dbh = dbh;
		this.#density = density;
	}
	calc() {
		const top = new Decimal(0.251).times(this.#density).times(new Decimal(this.#dbh).pow(2.46));
		const bottom = new Decimal(0.199).times(new Decimal(this.#density || config.defaultDensity).pow(0.899)).times(new Decimal(this.#dbh).pow(2.22));
		return {
			top: top.toFixed(config.digitLen),
			bottom: bottom.toFixed(config.digitLen),
		}
	}
}