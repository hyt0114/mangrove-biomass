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
class Aegiceras {
  constructor(dbh, height) {
    //#桐花树
    __privateAdd(this, _dbh, void 0);
    __privateAdd(this, _height, void 0);
    __privateSet(this, _dbh, dbh);
    __privateSet(this, _height, height);
  }
  calc() {
    if (__privateGet(this, _height) && __privateGet(this, _height) < 2) {
      return this.calcSeparate();
    } else {
      return this.calcWhole();
    }
  }
  calcSeparate() {
    const top = new common_vendor.Decimal(0.02039).times(new common_vendor.Decimal(__privateGet(this, _dbh)).pow(2).times(__privateGet(this, _height)).pow(0.83749));
    return {
      top: top.toFixed(10),
      bottom: 7
    };
  }
  calcWhole() {
    const whole = new common_vendor.Decimal(0.780778).times(__privateGet(this, _dbh)).minus(0.325215);
    return {
      whole: whole.toFixed(10)
    };
  }
}
_dbh = new WeakMap();
_height = new WeakMap();
exports.Aegiceras = Aegiceras;
