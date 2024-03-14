import Decimal from 'decimal.js';
import config from "../config.js"
//#白骨壤
export default class Avicennia {
	#dbh;
	#rate=0.41
	constructor(dbh) {
		this.#dbh = dbh;
	}
	calc() {
		this.validator();
		const whole = new Decimal(1.5066).times(new Decimal(this.#dbh).pow(1.595));
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
	}
}