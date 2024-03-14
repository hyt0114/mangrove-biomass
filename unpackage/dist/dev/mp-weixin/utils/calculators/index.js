"use strict";
const utils_calculators_aegiceras = require("./aegiceras.js");
const utils_calculators_avicennia = require("./avicennia.js");
const utils_calculators_unknownkind = require("./unknownkind.js");
const utils_calculators_rhizophoraStylosaGriff = require("./rhizophora-stylosa-griff.js");
function calc(type, dbh, height, density) {
  if (type === 1) {
    return new utils_calculators_aegiceras.Aegiceras(dbh, height).calc();
  } else if (type === 3) {
    return new utils_calculators_avicennia.Avicennia(dbh).calc();
  } else if (type === 4) {
    return new utils_calculators_rhizophoraStylosaGriff.RhizophoraStylosaGriff(dbh, height).calc();
  } else if (type === -1) {
    return new utils_calculators_unknownkind.UnknownKind(dbh, density).calc();
  }
  return null;
}
exports.calc = calc;
