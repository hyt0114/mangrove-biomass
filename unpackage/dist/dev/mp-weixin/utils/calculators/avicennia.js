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
var _dbh;
const common_vendor = require("../../common/vendor.js");
class Avicennia {
  constructor(dbh) {
    //#白骨壤
    __privateAdd(this, _dbh, void 0);
    __privateSet(this, _dbh, dbh);
  }
  calc() {
    const whole = new common_vendor.Decimal(1.5066).times(new common_vendor.Decimal(__privateGet(this, _dbh)).pow(1.595));
    return {
      whole: whole.toFixed(10)
    };
  }
}
_dbh = new WeakMap();
exports.Avicennia = Avicennia;
