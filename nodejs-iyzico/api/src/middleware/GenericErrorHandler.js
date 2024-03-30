import ApiError from "../error/ApiError";

// Bu middleware, gelen hataları işleyerek uygun şekilde yanıt verir.
// Eğer gelen hata ApiError türünde değilse, hatayı konsola yazdırır.
// Eğer gelen hata bir veri doğrulama hatasıysa, hatanın mesajından veri doğrulama hatasına neden olan alanı çıkarır.
// Son olarak, yanıt olarak hata durumunu (veya varsayılan olarak 500), hata mesajını ve hata kodunu döndürür.
const GenericErrorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    console.error(err);
  }
  if (/\w+ validation failed: \w+/i.test(err.message)) {
    err.message = err.message.replace(/\w+ validation failed: \w+/i, "");
  }
  res.status(err.status || 500).json({
    status: err?.status,
    error: err?.message,
    code: err.code,
  });
};
export default GenericErrorHandler;
