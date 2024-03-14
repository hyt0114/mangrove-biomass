import Decimal from 'decimal.js';
import config from "../config.js"
//#红树、拉氏红树
export default class Rhizophora {
	#dbh;
	#density;
	#rate=0.46
	constructor(dbh, density) {
		this.#dbh = dbh;
		this.#density = density;
	}
	calc() {
		this.validator();
		const top = new Decimal(0.235).times(new Decimal(this.#dbh).pow(2.42));
		const bottom = new Decimal(0.199).times(new Decimal(this.#density  || config.defaultDensity).pow(0.899)).times(new Decimal(this.#dbh)
			.pow(2.22));
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