import Decimal from 'decimal.js';
import config from "../config.js"
import {
	shapeEnums
} from "../enums.js"
//#红海榄
export default class RhizophoraStylosaGriff {
	#dbh;
	#density;
	#shape;
	#rate=0.46
	constructor(dbh,density) {
		this.#dbh = dbh;
		this.#density = density;
	}
	static config = {
		text: "红海榄",
		value: 4,
		dbhHelpText: "请输入0-12.5之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高4-6.5米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "density"
			],
		},
		img: "/static/img/trees/rhizophora-stylosa-griff.jpg"
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		const wt = new Decimal(this.#density).pow(0.899).times(new Decimal(this.#dbh).pow(2.22)).times(0.1719);
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
		if(!this.#density){
			throw new Error("请输入密度");
		}
	}
}