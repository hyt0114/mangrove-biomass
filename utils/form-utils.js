import {
	mangroveKinds
} from "./tree-kinds.js";

export function getDbhHelpText(kind) {
	const tree = mangroveKinds.find(t => t.value == kind);
	if (tree && tree.dbhHelpText) {
		return tree.dbhHelpText;
	}
	return "";
}
export function getTreeShapes(kind) {
	const tree = mangroveKinds.find(t => t.value == kind);
	if (tree && tree.shapes) {
		return tree.shapes;
	}
	return [];
}
export function getFormFields(kind, shape) {
	const tree = mangroveKinds.find(t => t.value == kind);
	if (tree && tree.fields && tree.fields[shape]) {
		return tree.fields[shape]
	}
	return [];
}
export function getNeedCalcType(kind) {
	const tree = mangroveKinds.find(t => t.value == kind);
	return tree ? !!tree.needCalcType : false;
}