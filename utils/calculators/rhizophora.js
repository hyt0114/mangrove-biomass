import Decimal from 'decimal.js';
import config from "../config.js"
//#红树、拉氏红树
export default class Rhizophora {
	#dbh;
	#density;
	#shape;
	#rate=0.46;
	constructor(dbh, density) {
		this.#dbh = dbh;
		this.#density = density;
	}
	setShape(shape) {
		this.#shape = shape;
	}
	calc() {
		// const wa = new Decimal(0.235).times(new Decimal(c).pow(2.42));
		// const wb = new Decimal(0.199).times(new Decimal(this.#density  || config.defaultDensity).pow(0.899)).times(new Decimal(this.#dbh)
		// 	.pow(2.22));
		const wa = new Decimal(10).pow(-1.832).times(new Decimal(this.#dbh).pow(2.42));
		const wb = new Decimal(10).pow(-3.318).times(new Decimal(this.#dbh).pow(2.886));
		
		return {
			wa: wa.toFixed(config.digitLen),
			wb: wb.toFixed(config.digitLen),
			wt: wa.plus(wb).toFixed(config.digitLen),
			ca: this.calcCf(wa),
			cb:this.calcCf(wb),
			cf:this.calcCf(wa,wb)
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
	}
}