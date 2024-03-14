import Decimal from 'decimal.js';
import config from "../config.js"
//#海桑属
export default class Sonneratia  {
	#dbh;
	#height;
	#rate=0.41;
	constructor(dbh,height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	calc() {
		this.validator();
		const whole = new Decimal(0.08469).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(0.8532));
		return {
			whole: whole.toFixed(config.digitLen),
			cf:this.calcCf(whole)
		}
	}
	calcCf(...nums){
		let total = new Decimal(0);
		nums.forEach(num=>{
			total = total.plus(num)
		})
		return total.times(this.#rate).toFixed(config.digitLen);
	}
	validator(){
		if(!this.#dbh){
			throw new Error("请输入胸径/基径");
		}
		if(!this.#height){
			throw new Error("请输入树高");
		}
	}
}