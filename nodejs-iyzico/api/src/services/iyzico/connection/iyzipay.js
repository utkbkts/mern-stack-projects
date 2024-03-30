import Iyzipay from "iyzipay";

const iyzipay = new Iyzipay({
  apiKey: "sandbox-E8k176Au2hSB8h0QVTQT2GaA1ms1MAZ1",
  secretKey: "GsGnFUs2Y1fpbVJuKwsQGAezp5qwn28U",
  uri: "https://sandbox-api.iyzipay.com",
});

console.log(iyzipay);

export default iyzipay;
