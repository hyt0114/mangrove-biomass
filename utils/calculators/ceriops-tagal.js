import Decimal from 'decimal.js';
import config from "../config.js";
import {
	shapeEnums
} from "../enums.js"
//#角木果
export default class CeriopsTagal  {
	#dbh;
	#shape;
	#rate=0.46;
	constructor(dbh) {
		this.#dbh = dbh;
	}
	static config = {
		text: "角木果",
		value: 8,
		dbhHelpText: "请输入0-8之间的小数",
		shapes: [{
			...shapeEnums.SMALL_MACROPHANEROPHYTES,
			tip: "建议胸径小于8厘米"
		}],
		fields: {
			[shapeEnums.SMALL_MACROPHANEROPHYTES.value]: [
				"dbh"
			],
		},
		img: "/static/img/trees/ceriops-tagal.jpg"
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		const wt = new Decimal(this.#dbh).pow(1.953).times(0.5199);
		return {
			wt: wt.toFixed(config.digitLen),
			cf:this.calcCf(wt)
		}
	}
	calcCf(...nums){
		let total = new Decimal(0);
		nums.forEach(num=>{
			total = total.plus(num)
		})
		return total.times(this.#rate).toFixed(config.digitLen);
	}
	validate(){
		if(!this.#dbh){
			throw new Error("请输入胸径");
		}
	}
}