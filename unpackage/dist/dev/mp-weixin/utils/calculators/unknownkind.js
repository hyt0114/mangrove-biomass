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
var _dbh, _density, _rate;
const common_vendor = require("../../common/vendor.js");
const utils_config = require("../config.js");
class UnknownKind {
  constructor(dbh, density) {
    __privateAdd(this, _dbh, void 0);
    __privateAdd(this, _density, void 0);
    __privateAdd(this, _rate, 0.45);
    __privateSet(this, _dbh, dbh);
    __privateSet(this, _density, density);
  }
  calc() {
    this.validator();
    const top = new common_vendor.Decimal(0.251).times(__privateGet(this, _density) || utils_config.config.defaultDensity).times(new common_vendor.Decimal(__privateGet(this, _dbh)).pow(2.46));
    const bottom = new common_vendor.Decimal(0.199).times(new common_vendor.Decimal(__privateGet(this, _density) || utils_config.config.defaultDensity).pow(0.899)).times(new common_vendor.Decimal(__privateGet(this, _dbh)).pow(2.22));
    return {
      top: top.toFixed(utils_config.config.digitLen),
      bottom: bottom.toFixed(utils_config.config.digitLen),
      cf: this.calcCf(top, bottom)
    };
  }
  calcCf(...nums) {
    let total = new common_vendor.Decimal(0);
    nums.forEach((num) => {
      total = total.plus(num);
    });
    return total.times(__privateGet(this, _rate)).toFixed(utils_config.config.digitLen);
  }
  validator() {
    if (!__privateGet(this, _dbh)) {
      throw new Error("请输入胸径/基径");
    }
  }
}
_dbh = new WeakMap();
_density = new WeakMap();
_rate = new WeakMap();
exports.UnknownKind = UnknownKind;
