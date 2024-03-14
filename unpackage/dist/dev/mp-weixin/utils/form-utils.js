"use strict";
const utils_treeKinds = require("./tree-kinds.js");
function getDbhHelpText(type) {
  const tree = utils_treeKinds.mangroveKinds.find((t) => t.value == type);
  if (tree && tree.dbhHelpText) {
    return tree.dbhHelpText;
  }
  return "";
}
exports.getDbhHelpText = getDbhHelpText;
