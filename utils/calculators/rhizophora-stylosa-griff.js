import Decimal from 'decimal.js';
import config from "../config.js"
//#红海榄
export default class RhizophoraStylosaGriff {
	#dbh;
	#height;
	#shape;
	#rate=0.46
	constructor(dbh,height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		const wt = new Decimal(0.1719).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(1.0254));
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
			throw new Error("请输入胸径/基径");
		}
		if(!this.#height){
			throw new Error("请输入树高");
		}
	}
}