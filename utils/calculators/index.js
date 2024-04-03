import Aegiceras from "./aegiceras.js";
import Kandelia from "./kandelia.js"
import Avicennia from "./avicennia.js";
import RhizophoraStylosaGriff from "./rhizophora-stylosa-griff.js"
import BruguieraGymnorrhiza from "./bruguiera-gymnorrhiza.js"
import CeriopsTagal from "./ceriops-tagal.js"
import Rhizophora from "./rhizophora.js"
import Sonneratia from "./sonneratia"
import Pagatpat from "./pagatpat"
import UnknownKind from "./unknownkind.js"
export const mangroveKinds = [
	Aegiceras.config,
	Kandelia.config,
	Avicennia.config,
	RhizophoraStylosaGriff.config,
	BruguieraGymnorrhiza.config("木榄","/static/img/trees/bruguiera-gymnorrhiza.jpg"),
	BruguieraGymnorrhiza.config("海莲","/static/img/trees/bruguiera-sexangula.jpg"),
	BruguieraGymnorrhiza.config("尖瓣海莲","/static/img/trees/bruguiera-sexangula-cuspid.jpg"),
	CeriopsTagal.config,
	Rhizophora.config("红树","/static/img/trees/rhizophora.jpg"),
	Rhizophora.config("拉氏红树","/static/img/trees/rhizophora-lamarckii-montrouz.jpg"),
	Sonneratia.config,
	Pagatpat.config,
	UnknownKind.config,
]
/**
 * @param {Object} type 物种
 * @param {Object} dbh  胸径/基径
 * @param {Object} height 高度
 * @param {Object} density 密度
 */
export function calc({
	type,
	shape,
	dbh,
	basal,
	height,
	density,
	crown,
	exts
}) {
	let targetTreeCalc = null;
	if (type === 1) {
		targetTreeCalc = new Aegiceras(dbh, basal, height)
	} else if (type === 2) {
		targetTreeCalc = new Kandelia(dbh, basal, height)
	} else if (type === 3) {
		targetTreeCalc = new Avicennia(dbh, basal, height, crown)
	} else if (type === 4) {
		targetTreeCalc = new RhizophoraStylosaGriff(dbh, density)
	} else if (type === 5 || type === 6 || type === 7) {
		targetTreeCalc = new BruguieraGymnorrhiza(dbh, basal, height)
	} else if (type === 8) {
		targetTreeCalc = new CeriopsTagal(dbh)
	} else if (type === 9 || type === 10) {
		targetTreeCalc = new Rhizophora(dbh, density)
	} else if (type === 11) {
		targetTreeCalc = new Sonneratia(dbh, height)
	} else if (type === 12) {
		targetTreeCalc = new Pagatpat(dbh, height)
	} else if (type === -1) {
		targetTreeCalc = new UnknownKind(dbh, density)
	}
	if (targetTreeCalc) {
		targetTreeCalc.setShape(shape);
		targetTreeCalc.validate(exts);
		return targetTreeCalc.calc(exts);
	}
	return null;
}