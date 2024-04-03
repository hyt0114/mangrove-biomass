import Decimal from 'decimal.js';
import config from "../config.js"
import {
	shapeEnums
} from "../enums.js"
//#海桑属
export default class Sonneratia  {
	#dbh;
	#height;
	#shape;
	#rate=0.41;
	constructor(dbh,height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	static config = {
		text: "海桑属",
		value: 11,
		dbhHelpText: "请输入2.5-13.0之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高3-7米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
		},
		img: "/static/img/trees/sonneratia.jpg"
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		const wt = new Decimal(this.#dbh).pow(2).times(this.#height).pow(0.8532).times(0.08469);
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
		if(!this.#height){
			throw new Error("请输入树高");
		}
	}
}