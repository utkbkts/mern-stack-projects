"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _iyzipay = _interopRequireDefault(require("iyzipay"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const iyzipay = new _iyzipay.default({
  apiKey: "sandbox-E8k176Au2hSB8h0QVTQT2GaA1ms1MAZ1",
  secretKey: "GsGnFUs2Y1fpbVJuKwsQGAezp5qwn28U",
  uri: "https://sandbox-api.iyzipay.com"
});
console.log(iyzipay);
var _default = exports.default = iyzipay;