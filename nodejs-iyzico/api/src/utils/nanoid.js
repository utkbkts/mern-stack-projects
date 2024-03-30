import * as nanoid from "nanoid";

const Nanoid = nanoid.customAlphabet(
  "0123456789qwertyuıopğüasdfghjklşizxcvbnmçöQWERTYUIOPĞÜASDFGHJKLŞİZXCVBNMÖÇ",
  20
);

export default Nanoid;
