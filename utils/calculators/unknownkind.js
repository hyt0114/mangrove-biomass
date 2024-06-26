import Decimal from 'decimal.js';
import config from "../config.js"
import {
	shapeEnums
} from "../enums.js"
//#通用方程
export default class UnknownKind {

	#dbh;
	#density;
	#shape;
	#rate = 0.45
	constructor(dbh, density) {
		this.#dbh = dbh;
		this.#density = density;
	}
	static config = {
		text: "通用",
		value: -1,
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议胸径小于45厘米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		},
		img: "/static/img/trees/forest.png"
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		const wa = new Decimal(0.251).times(this.#density || config.defaultDensity).times(new Decimal(this.#dbh)
			.pow(2.46));
		const wb = new Decimal(0.199).times(new Decimal(this.#density || config.defaultDensity).pow(0.899)).times(
			new Decimal(this.#dbh).pow(2.22));
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
	validate() {
		if (!this.#dbh) {
			throw new Error("请输入胸径");
		}
	}
}