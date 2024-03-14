import Aegiceras from "./aegiceras.js";
import Kandelia from "./kandelia.js"
import Avicennia from "./avicennia.js";
import RhizophoraStylosaGriff from "./rhizophora-stylosa-griff.js"
import BruguieraGymnorrhiza from "./bruguiera-gymnorrhiza.js"
import CeriopsTagal from "./ceriops-tagal.js"
import Rhizophora from "./rhizophora.js"
import Sonneratia from "./sonneratia"
import UnknownKind from "./unknownkind.js"

/**
 * @param {Object} type 物种
 * @param {Object} dbh  胸径/基径
 * @param {Object} height 高度
 * @param {Object} density 密度
 */
export default function calc(type, dbh, height, density) {
	if (type === 1) {
		return new Aegiceras(dbh, height).calc();
	} else if (type === 2) {
		return new Kandelia(dbh, height).calc();
	} else if (type === 3) {
		return new Avicennia(dbh).calc();
	} else if (type === 4) {
		return new RhizophoraStylosaGriff(dbh, height).calc();
	} else if (type === 5 || type === 6 || type === 7) {
		return new BruguieraGymnorrhiza(dbh).calc();
	} else if (type === 8) {
		return new CeriopsTagal(dbh).calc();
	} else if (type === 9 || type === 10) {
		return new Rhizophora(dbh,density).calc();
	}else if (type === 11) {
		return new Sonneratia(dbh,height).calc();
	} else if (type === -1) {
		return new UnknownKind(dbh, density).calc();
	}
	return null;
}