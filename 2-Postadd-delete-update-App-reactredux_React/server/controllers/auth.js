const AuthSchema = require("../models/auth.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, email, confirmPassword } = req.body;

    // E-posta doğrulaması yap
    const isEmailValid = isEmail(email);
    if (!isEmailValid) {
      return res.status(500).json({ message: "Invalid email address" });
    }

    // E-posta adresi kullanımda mı kontrol et
    const existingUser = await AuthSchema.findOne({ email });
    if (existingUser) {
      return res.status(500).json({ message: "Email is already in use" });
    }

    // Şifrelerin eşleştiğini kontrol et
    if (password !== confirmPassword) {
      return res.status(500).json({ message: "Passwords do not match" });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await AuthSchema.create({
      username,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      newUser,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthSchema.findOne(email);
    if (!user) {
      return res.status(500).json({ message: "User is does not find" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res.status(500).json({ message: "Entered password incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "1h",
    });

    res.status(201).json({
      status: "OK",
      user,
      token,
      message: "User Login successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

function isEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

module.exports = { register, login };
