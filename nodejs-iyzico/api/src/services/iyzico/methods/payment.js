import iyzipay from "../connection/iyzipay.js";

export const createPayment = (data) => {
  return new Promise((resolve, reject) => {
    iyzipay.payment.create(data, (err, result) => {
      if (err) {
        err(result);
      } else {
        resolve(result);
      }
    });
  });
};
