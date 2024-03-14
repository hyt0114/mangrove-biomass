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
var _dbh, _height, _rate;
const common_vendor = require("../../common/vendor.js");
const utils_config = require("../config.js");
class Aegiceras {
  constructor(dbh, height) {
    __privateAdd(this, _dbh, void 0);
    __privateAdd(this, _height, void 0);
    __privateAdd(this, _rate, 0.44);
    __privateSet(this, _dbh, dbh);
    __privateSet(this, _height, height);
  }
  calc() {
    this.validator();
    if (__privateGet(this, _height) && __privateGet(this, _height) < 2) {
      return this.calcSeparate();
    } else {
      return this.calcWhole();
    }
  }
  calcSeparate() {
    const top = new common_vendor.Decimal(0.02039).times(new common_vendor.Decimal(__privateGet(this, _dbh)).pow(2).times(__privateGet(this, _height)).pow(0.83749));
    const bottom = top.dividedBy(7);
    return {
      top: top.toFixed(utils_config.config.digitLen),
      bottom: bottom.toFixed(utils_config.config.digitLen),
      cf: this.calcCf(top, bottom)
    };
  }
  calcWhole() {
    const whole = new common_vendor.Decimal(0.780778).times(__privateGet(this, _dbh)).minus(0.325215);
    return {
      whole: whole.toFixed(utils_config.config.digitLen),
      cf: this.calcCf(whole)
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
    if (!__privateGet(this, _height)) {
      throw new Error("请输入树高");
    }
  }
}
_dbh = new WeakMap();
_height = new WeakMap();
_rate = new WeakMap();
exports.Aegiceras = Aegiceras;
