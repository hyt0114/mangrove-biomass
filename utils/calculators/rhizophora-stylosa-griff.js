import Decimal from 'decimal.js';
import config from "../config.js"
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