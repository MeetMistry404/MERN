const User = require("../Model/user_model");

const getAll = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const create = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, username, phone } = req.body;
    const existUser = await User.findOne({ email });

    if (existUser) {
      res.status(402).json({ msg: "email already exist" });
    }

    const newUser = await User.create({ email, password, username, phone });

    res.status(200).json({
      msg: "registation successful",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(400).json({ msg: "bad request" });
    }
    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const del = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "invalid email" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = { getAll, create, update, del, signIn };
