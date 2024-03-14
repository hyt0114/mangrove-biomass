import {
	mangroveKinds
} from "./tree-kinds.js";

export function getDbhHelpText(type) {
	const tree = mangroveKinds.find(t => t.value == type);
	if (tree && tree.dbhHelpText) {
		return tree.dbhHelpText;
	}
	return "";
}