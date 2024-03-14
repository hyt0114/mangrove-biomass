"use strict";
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _dbh, _height;
const common_vendor = require("../../common/vendor.js");
class RhizophoraStylosaGriff {
  constructor(dbh, height) {
    //#红海榄
    __privateAdd(this, _dbh, void 0);
    __privateAdd(this, _height, void 0);
    __privateSet(this, _dbh, dbh);
    __privateSet(this, _height, height);
  }
  calc() {
    const whole = new common_vendor.Decimal(0.1719).times(new common_vendor.Decimal(__privateGet(this, _dbh)).pow(2).times(__privateGet(this, _height)).pow(1.0254));
    return {
      whole: whole.toFixed(10)
    };
  }
}
_dbh = new WeakMap();
_height = new WeakMap();
exports.RhizophoraStylosaGriff = RhizophoraStylosaGriff;
