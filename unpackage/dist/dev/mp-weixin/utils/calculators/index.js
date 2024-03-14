"use strict";
const utils_calculators_aegiceras = require("./aegiceras.js");
const utils_calculators_kandelia = require("./kandelia.js");
const utils_calculators_avicennia = require("./avicennia.js");
const utils_calculators_rhizophoraStylosaGriff = require("./rhizophora-stylosa-griff.js");
const utils_calculators_bruguieraGymnorrhiza = require("./bruguiera-gymnorrhiza.js");
const utils_calculators_ceriopsTagal = require("./ceriops-tagal.js");
const utils_calculators_rhizophora = require("./rhizophora.js");
const utils_calculators_sonneratia = require("./sonneratia.js");
const utils_calculators_unknownkind = require("./unknownkind.js");
function calc(type, dbh, height, density) {
  if (type === 1) {
    return new utils_calculators_aegiceras.Aegiceras(dbh, height).calc();
  } else if (type === 2) {
    return new utils_calculators_kandelia.Kandelia(dbh, height).calc();
  } else if (type === 3) {
    return new utils_calculators_avicennia.Avicennia(dbh).calc();
  } else if (type === 4) {
    return new utils_calculators_rhizophoraStylosaGriff.RhizophoraStylosaGriff(dbh, height).calc();
  } else if (type === 5 || type === 6 || type === 7) {
    return new utils_calculators_bruguieraGymnorrhiza.BruguieraGymnorrhiza(dbh).calc();
  } else if (type === 8) {
    return new utils_calculators_ceriopsTagal.CeriopsTagal(dbh).calc();
  } else if (type === 9 || type === 10) {
    return new utils_calculators_rhizophora.Rhizophora(dbh, density).calc();
  } else if (type === 11) {
    return new utils_calculators_sonneratia.Sonneratia(dbh, height).calc();
  } else if (type === -1) {
    return new utils_calculators_unknownkind.UnknownKind(dbh, density).calc();
  }
  return null;
}
exports.calc = calc;
