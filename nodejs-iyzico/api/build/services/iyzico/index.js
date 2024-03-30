"use strict";

var Cards = _interopRequireWildcard(require("./methods/cards.js"));
var _nanoid = _interopRequireDefault(require("../../utils/nanoid.js"));
var Logs = _interopRequireWildcard(require("../../utils/logs.js"));
var _iyzipay = _interopRequireDefault(require("iyzipay"));
var Installments = _interopRequireWildcard(require("./methods/installMethod.js"));
var Payments = _interopRequireWildcard(require("./methods/payment.js"));
var PaymentThreeDs = _interopRequireWildcard(require("./methods/threeds-payment.js"));
var Checkouts = _interopRequireWildcard(require("./methods/checkout.js"));
var Delete = _interopRequireWildcard(require("./methods/deletePayment.js"));
var Refund = _interopRequireWildcard(require("./methods/refund-payment.js"));
var _nanoid2 = require("nanoid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// ---------------------------------------
// CARDS
// ---------------------------------------

const CreateUserAndCards = () => {
  Cards.createUserCard({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: (0, _nanoid.default)() /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    email: "test@email.com" /* kart sahibinin e posta hesabı - zorunlu */,
    externalId: (0, _nanoid.default)() /* sakladığımız karta bizim verdiğimiz ID */,
    card: {
      cardAlias: "card alias" /* * karta verilen isim - Kullanıcı tarafından belirlenir */,
      cardHolderName: "John Doe" /* * kartta yazan isim */,
      cardNumber: "5528790000000008" /* * kart numarası */,
      expireMonth: "12" /* * kartın son kullanma tarihinin ay bölümü */,
      expireYear: "2030" /* * kartın son kullanma tarihinin yıl bölümü */
    }
  }).then(result => {
    console.log(result);
    Logs.logFile("1-cards-user-and-createcard", result);
  }).catch(err => {
    Logs.logFile("1-cards-user-and-createcard-error", err);
    console.log(err);
  });
};
// CreateUserAndCards();

const CreateUserForCards = () => {
  Cards.createUserCard({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: (0, _nanoid.default)() /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    email: "test@email.com" /* kart sahibinin e posta hesabı - zorunlu */,
    externalId: (0, _nanoid.default)() /* sakladığımız karta bizim verdiğimiz ID */,
    cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
    card: {
      cardAlias: "card alias" /* * karta verilen isim - Kullanıcı tarafından belirlenir */,
      cardHolderName: "John Doe" /* * kartta yazan isim */,
      cardNumber: "5528790000000008" /* * kart numarası */,
      expireMonth: "12" /* * kartın son kullanma tarihinin ay bölümü */,
      expireYear: "2030" /* * kartın son kullanma tarihinin yıl bölümü */,
      cvc: "123"
    }
  }).then(result => {
    console.log(result);
    Logs.logFile("2-karta-bir-kullanici-ekle", result);
  }).catch(err => {
    Logs.logFile("2-karta-bir-kullanici-ekle-error", err);
    console.log(err);
  });
};
// CreateUserForCards();

// bir kullanicic kartlarini oku
const ReadCardOfUser = () => {
  Cards.getUserCards({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: (0, _nanoid.default)() /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY="
  }).then(result => {
    console.log(result);
    Logs.logFile("3-kart-bir-kullanicinin-kartlarini-oku", result);
  }).catch(err => {
    Logs.logFile("3-kart-bir-kullanicinin-kartlarini-oku-error", err);
    console.log(err);
  });
};
// ReadCardOfUser();

// bir kullanici kart sil
const deleteCardOfUser = () => {
  Cards.deleteUserCards({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: (0, _nanoid.default)() /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
    cardToken: "mtrMTKzuEQMzzmMVq+5/RbucRN0="
  }).then(result => {
    console.log(result);
    Logs.logFile("4-kart-bir-kullanicinin-kartlarini-sil", result);
  }).catch(err => {
    Logs.logFile("4-kart-bir-kullanicinin-kartlarini-sil-error", err);
    console.log(err);
  });
};
// deleteCardOfUser();

// ---------------------------------------
// INSTALLMENT--KART ÜCRET KONTROLÜ
// ---------------------------------------
// cart ücret ile ilgili gerçekleşecek taksitlerin kontrolü

const checkInstallment = () => {
  return Installments.CheckInstallment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid.default)(),
    binNumber: "55287900",
    //kartın hangi bankaya ait olduğunu gösterir
    price: "1000" //ne kadarlık alışveriş ile taksit yapılacak
  }).then(result => {
    console.log(result);
    Logs.logFile("5-installment-kart-ücret-kontrolü", result);
  }).catch(err => {
    Logs.logFile("5-installment-kart-ücret-kontrolü-error", err);
    console.log(err);
  });
};
// checkInstallment();

// ---------------------------------------
// NORMAL ÖDEME
// ---------------------------------------

//kayıtlı olmayan kart ile ödeme ve kaydetme

const createPayment = () => {
  return Payments.createPayment({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1000" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    paymentCard: {
      cardHolderName: "John Doe" /* Kart sahibinin adı */,
      cardNumber: "5528790000000008" /* Kart numarası */,
      expireMonth: "12" /* Kartın son kullanma tarihi ay bilgisi */,
      expireYear: "2030" /* Kartın son kullanma tarihi yıl bilgisi */,
      cvc: "123" /* Kartın cvc bilgisi */,
      registerCard: "0" /* Ödeme esnasında kartın kaydedilip kaydedilmeyeceğini belirleyen parametre. Varsayılan değeri 0 olup, geçerli değerler 0 ve 1’dir. */
    },
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "100" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "400"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "500"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("6-olmayan-kart-odemesi", result);
  }).catch(err => {
    Logs.logFile("6-olmayan-kart-odemesi-error", err);
    console.log(err);
  });
};
// createPayment();

//save cart

const createSaveCart = () => {
  return Payments.createPayment({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    paymentCard: {
      cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
      cardAlias: "kredi kartim ödemeden sonra",
      cardHolderName: "John Doe" /* Kart sahibinin adı */,
      cardNumber: "5528790000000008" /* Kart numarası */,
      expireMonth: "12" /* Kartın son kullanma tarihi ay bilgisi */,
      expireYear: "2030" /* Kartın son kullanma tarihi yıl bilgisi */,
      cvc: "123" /* Kartın cvc bilgisi */,
      registerCard: "1" /* Ödeme esnasında kartın kaydedilip kaydedilmeyeceğini belirleyen parametre. Varsayılan değeri 0 olup, geçerli değerler 0 ve 1’dir. */
    },
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "0.3" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("7-kart-kaydetmek", result);
  }).catch(err => {
    Logs.logFile("7-kart-kaydetmek-error", err);
    console.log(err);
  });
};
// createSaveCart();
// ReadCardOfUser();

//bir kayitli kart ile ödeme yap

const createSaveCartPayment = () => {
  return Payments.createPayment({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    paymentCard: {
      cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
      cardToken: "4pyIyTg7fVlN5dudfSDHIx7mw7k="
    },
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "0.3" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("8-kayitlibir-kart-ile-odeme-yap", result);
  }).catch(err => {
    Logs.logFile("8-kayitlibir-kart-ile-odeme-yap-error", err);
    console.log(err);
  });
};
// createSaveCartPayment();

// ---------------------------------------
// 3D ÖDEME YÖNTEMİ
// ---------------------------------------

const initializeThreeDSPayment = () => {
  PaymentThreeDs.initializePayment({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardHolderName: "John Doe" /* Kart sahibinin adı */,
      cardNumber: "5528790000000008" /* Kart numarası */,
      expireMonth: "12" /* Kartın son kullanma tarihi ay bilgisi */,
      expireYear: "2030" /* Kartın son kullanma tarihi yıl bilgisi */,
      cvc: "123" /* Kartın cvc bilgisi */,
      registerCard: "0" /* Ödeme esnasında kartın kaydedilip kaydedilmeyeceğini belirleyen parametre. Varsayılan değeri 0 olup, geçerli değerler 0 ve 1’dir. */
    },
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "0.3" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("9-threads-payments-yeni-kart-odeme", result);
  }).catch(err => {
    Logs.logFile("9-threads-payments-yeni-kart-odeme-error", err);
    console.log(err);
  });
};
// initializeThreeDSPayment();

const completedThreeDSPayment = () => {
  PaymentThreeDs.completedPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid2.nanoid)(),
    paymentId: "1231242",
    conversationData: "conversation data"
  }).then(result => {
    console.log(result);
    Logs.logFile("9-threads-payments-yeni-kart-odeme", result);
  }).catch(err => {
    Logs.logFile("9-threads-payments-yeni-kart-odeme-error", err);
    console.log(err);
  });
};
// completedThreeDSPayment()

//3d ödeme kayıtlı kart ile yapmak
const initializeThreeDSPaymentWithRegisterCard = () => {
  PaymentThreeDs.initializePayment({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
      cardToken: "4pyIyTg7fVlN5dudfSDHIx7mw7k="
    },
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "0.3" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("11-threads-payments-yeni-kart-odeme", result);
  }).catch(err => {
    Logs.logFile("11-threads-payments-yeni-kart-odeme-error", err);
    console.log(err);
  });
};
// initializeThreeDSPaymentWithRegisterCard();

//3d ödeme yap kartı kaydet
const initialize3dPaymentWithCardRegister = () => {
  PaymentThreeDs.initializePayment({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
      cardAlias: "kredi kartim ödemeden sonra",
      cardHolderName: "John Doe" /* Kart sahibinin adı */,
      cardNumber: "5528790000000008" /* Kart numarası */,
      expireMonth: "12" /* Kartın son kullanma tarihi ay bilgisi */,
      expireYear: "2030" /* Kartın son kullanma tarihi yıl bilgisi */,
      cvc: "123" /* Kartın cvc bilgisi */,
      registerCard: "1" /* Ödeme esnasında kartın kaydedilip kaydedilmeyeceğini belirleyen parametre. Varsayılan değeri 0 olup, geçerli değerler 0 ve 1’dir. */
    },
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "0.3" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("12-kayitliolmayan-kart-ode-kaydet", result);
  }).catch(err => {
    Logs.logFile("12-kayitliolmayan-kart-ode-kaydet-error", err);
    console.log(err);
  });
};
// initialize3dPaymentWithCardRegister();
// ReadCardOfUser();

// ---------------------------------------
// CHECKOUT FORM
// ---------------------------------------
//checkout içerisinde ödeme başlat

const initializeCheckoutForm = () => {
  Checkouts.initialize({
    locale: _iyzipay.default.LOCALE.TR /* iyzico istek sonucunda dönen metinlerin dilini ayarlamak için kullanılır */,
    conversationId: "123456789" /* istek ve cevap eşleşmesi yapılması için kullanılabilecek ID */,
    price: "1" /* Sepetteki ürünlerin her birisinin kırılımlarının toplamıdır. */,
    paidPrice: "30" /* Tüm vade farkı vb hesaplanmış POS'tan çekilecek tutardır */,
    currency: _iyzipay.default.CURRENCY.TRY /* Para birimidir. Kurlar için Iyzico'dam özel izin gerektirecektir */,
    installment: "1" /* Taksit bilgisidir. Tek çekim için 1 olmalıdır (1, 2, 3, 6, 9, 12) */,
    basketId: "B67832" /* Sepetin ID'sidir. Ödeme ID'si olarak tanımlanabilir */,
    paymentChannel: _iyzipay.default.PAYMENT_CHANNEL.WEB /* Ödemenin hangi platformdan yapıldığını belirtir. */,
    paymentGroup: _iyzipay.default.PAYMENT_GROUP.PRODUCT /* Ödeme grubu, varsayılan PRODUCT */,
    callbackUrl: "https://localhost/api/checkout/complete/payment",
    cardUserKey: "utFVUtM30Hqy9dgK9hsTrqfo4eY=",
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: "BY789" /* Kullanıcının üst sistemdeki ID numarası */,
      name: "John" /* Kullanıcının adı */,
      surname: "Doe" /* Kullanıcın soyadı */,
      gsmNumber: "+905350000000" /* Kullanıcının telefon numarası */,
      email: "email@email.com" /* Kullanıcının e-posta adresi */,
      identityNumber: "00000000000" /* Kullanıcının kimlik numarası / eğer yoksa 11 tane 0 girilebilir */,
      lastLoginDate: "2015-10-05 12:43:35" /* En son giriş tarihi */,
      registrationDate: "2013-04-21 15:12:09" /* Kayıt tarihi */,
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Kullanıcının kayıt adresi */,
      ip: "85.34.78.112" /* Kullanıcının IP adresi */,
      city: "Istanbul" /* Kullanıcının şehri */,
      country: "Turkey" /* Kullanıcının ülkesi */,
      zipCode: "34732" /* Kullanıcının posta kodu */
    },
    shippingAddress: {
      contactName: "Jane Doe" /* Teslimat için Kullanıcının Adı */,
      city: "Istanbul" /* Teslimat için Kullanıcının Şehri */,
      country: "Turkey" /* Teslimat için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Teslimat için Kullanıcının Şehri */,
      zipCode: "34742" /* Teslimat için Kullanıcının Posta Kodu */
    },
    billingAddress: {
      contactName: "Jane Doe" /* Fatura için Kullanıcının Adı */,
      city: "Istanbul" /* Fatura için Kullanıcının Şehri */,
      country: "Turkey" /* Fatura için Kullanıcının Ülkesi */,
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1" /* Fatura için Kullanıcının Adresi */,
      zipCode: "34742" /* Fatura için Kullanıcının Posta Kodu */
    },
    basketItems: [{
      id: "BI101" /* Sepet ürününün ID'si */,
      name: "Binocular" /* Sepet ürününün adı */,
      category1: "Collectibles" /* Sepet ürününün ilk kategorisi */,
      category2: "Accessories" /* Sepet ürününün ikinci kategorisi */,
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL /* Sepet ürününün tipi */,
      price: "0.3" /* Sepet ürününün toplam fiyattaki kırılımı */
    }, {
      id: "BI102",
      name: "Game code",
      category1: "Game",
      category2: "Online Game Items",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.VIRTUAL,
      price: "0.5"
    }, {
      id: "BI103",
      name: "Usb",
      category1: "Electronics",
      category2: "Usb / Cable",
      itemType: _iyzipay.default.BASKET_ITEM_TYPE.PHYSICAL,
      price: "0.2"
    }]
  }).then(result => {
    console.log(result);
    Logs.logFile("13-checkout-form", result);
  }).catch(err => {
    Logs.logFile("13-checkout-form-error", err);
    console.log(err);
  });
};

// initializeCheckoutForm();

//tamamlanmiı veya tamamlamamış checkout ödeme bilgisini gösterir
const getFormPayment = () => {
  Checkouts.getFormPayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid2.nanoid)(),
    token: "07fb7c61-4cdd-4a97-affb-2bb0d394f72e"
  }).then(result => {
    console.log(result);
    Logs.logFile("14-checkout-form-get-details", result);
  }).catch(err => {
    Logs.logFile("14-checkout-form-get-details-error", err);
    console.log(err);
  });
};
// getFormPayment();

// ---------------------------------------
// DELETE FORM
// ---------------------------------------

const cancelPayments = () => {
  Delete.deletePayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid2.nanoid)(),
    paymentId: "21920952",
    ip: "85.34.78.112"
  }).then(result => {
    console.log(result);
    Logs.logFile("15-delete-form", result);
  }).catch(err => {
    Logs.logFile("15-delete-error", err);
    console.log(err);
  });
};
// cancelPayments();

const cancelPaymentsReason = () => {
  Delete.deletePayment({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid2.nanoid)(),
    paymentId: "21920952",
    ip: "85.34.78.112",
    reason: _iyzipay.default.REFUND_REASON.BUYER_REQUEST,
    //kullanici isteiği ile iptal
    description: "kullanici isteği ile iptal edildi"
  }).then(result => {
    console.log(result);
    Logs.logFile("16-delete-reason-form", result);
  }).catch(err => {
    Logs.logFile("16-delete-reason-error", err);
    console.log(err);
  });
};
// cancelPaymentsReason();

// ---------------------------------------
// REFUND PAYMENTS
// ---------------------------------------

//ödemenin belirli bir parçasını iade et

const refundPayment = () => {
  Refund.refundPayments({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid2.nanoid)(),
    paymentTransactionId: "23858888",
    //ödemelere açılan ürünlere farklı atanan id ler
    price: "1",
    currency: _iyzipay.default.CURRENCY.TR,
    ip: "85.34.78.112"
  }).then(result => {
    console.log(result);
    Logs.logFile("17-refund-payments", result);
  }).catch(err => {
    Logs.logFile("17-refund-payments-error", err);
    console.log(err);
  });
};
// refundPayment();

//ödemenin belirli bir parçasını neden açıklama ile iade et

const refundPaymentReason = () => {
  Refund.refundPayments({
    locale: _iyzipay.default.LOCALE.TR,
    conversationId: (0, _nanoid2.nanoid)(),
    paymentTransactionId: "23858888",
    //ödemelere açılan ürünlere farklı atanan id ler
    price: "1",
    currency: _iyzipay.default.CURRENCY.TR,
    ip: "85.34.78.112",
    reason: _iyzipay.default.REFUND_REASON.BUYER_REQUEST,
    description: "kullanici iade istedi"
  }).then(result => {
    console.log(result);
    Logs.logFile("18-refund-reason-payments", result);
  }).catch(err => {
    Logs.logFile("18-refund-payments-reason-error", err);
    console.log(err);
  });
};
refundPaymentReason();