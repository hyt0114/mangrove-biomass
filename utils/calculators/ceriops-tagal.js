import Decimal from 'decimal.js';
import config from "../config.js"
//#角木果
export default class CeriopsTagal  {
	#dbh;
	#rate=0.46;
	constructor(dbh) {
		this.#dbh = dbh;
	}
	calc() {
		this.validator();
		const whole = new Decimal(0.5199).times(new Decimal(this.#dbh).pow(1.953));
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