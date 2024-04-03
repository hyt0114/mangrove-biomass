import Decimal from 'decimal.js';
import config from "../config.js";
import {
	shapeEnums
} from "../enums.js"
//#无瓣海桑
export default class Pagatpat  {
	#dbh;
	#height;
	#shape;
	#rate=0.41;
	constructor(dbh,height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	static config = {
		text: "无瓣海桑",
		value: 12,
		dbhHelpText: "请输入6.1-13.0之间的小数",
		shapes: [{
			...shapeEnums.MACROPHANEROPHYTES,
			tip: "建议树高6-13米"
		}],
		fields: {
			[shapeEnums.MACROPHANEROPHYTES.value]: [
				"dbh", "height"
			],
		},
		img: "/static/img/trees/pagatpat.jpg"
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		const wa = new Decimal(this.#dbh).pow(2).times(this.#height).pow(0.966).times(0.034);
		const wb = new Decimal(this.#dbh).pow(2).times(this.#height).pow(1.119).times(0.003);
		const wt = new Decimal(this.#dbh).pow(2).times(this.#height).pow(1.002).times(0.033);
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wt.toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb:this.calcCf(wb),
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