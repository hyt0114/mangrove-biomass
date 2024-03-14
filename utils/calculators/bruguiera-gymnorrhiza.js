import Decimal from 'decimal.js';
import config from "../config.js"
//#木榄、海莲，尖瓣海莲
export default class BruguieraGymnorrhiza {
	#dbh;
	#rate=0.46
	constructor(dbh) {
		this.#dbh = dbh;
	}
	calc() {
		this.validator();
		const top = new Decimal(0.186).times(new Decimal(this.#dbh).pow(2.31));
		const bottom = new Decimal(0.4697).times(new Decimal(this.#dbh).pow(1.5543));
		return {
			top: top.toFixed(config.digitLen),
			bottom: bottom.toFixed(config.digitLen),
			cf:this.calcCf(top,bottom)
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