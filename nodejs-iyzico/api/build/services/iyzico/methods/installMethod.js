"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckInstallment = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CheckInstallment = data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.installmentInfo.retrieve(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.CheckInstallment = CheckInstallment;