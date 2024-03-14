import Decimal from 'decimal.js';
import config from "../config.js"
//#秋茄
export default class Kandelia {
	#dbh;
	#height;
	#rate=0.47
	constructor(dbh, height) {
		this.#dbh = dbh;
		this.#height = height;
	}
	calc() {
		if (this.#height && this.#height < 2) {
			//高度小于2
			return this.calcByLow();
		} else {
			return this.calcByHigh();
		}
	}
	calcByLow() {
		const top = new Decimal(0.01016).times(new Decimal(this.#dbh).pow(2.454));
		const bottom = new Decimal(0.007649).times(new Decimal(this.#dbh).pow(2.064));
		return {
			top: top.toFixed(config.digitLen),
			bottom: bottom.toFixed(config.digitLen),
			cf:this.calcCf(top,bottom)
		}
	}
	calcByHigh() {
		const top = new Decimal(0.03999).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(1.053));
		const bottom = new Decimal(0.02972).times(new Decimal(this.#dbh).pow(2).times(this.#height).pow(0.990));
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
		if(!this.#height){
			throw new Error("请输入树高");
		}
	}
}