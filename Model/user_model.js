const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jws = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: String,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    console.error(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jws.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.Secret_Key,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {}
};

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;
