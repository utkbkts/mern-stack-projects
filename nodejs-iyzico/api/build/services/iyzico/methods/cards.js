"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserCards = exports.deleteUserCards = exports.createUserCard = void 0;
var _iyzipay = _interopRequireDefault(require("../connection/iyzipay.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createUserCard = async data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.card.create(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.createUserCard = createUserCard;
const getUserCards = async data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.cardList.retrieve(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.getUserCards = getUserCards;
const deleteUserCards = async data => {
  return new Promise((resolve, reject) => {
    _iyzipay.default.card.delete(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
exports.deleteUserCards = deleteUserCards;