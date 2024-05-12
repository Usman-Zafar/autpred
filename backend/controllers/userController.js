const User = require("../modals/userSchema");
const jwt = require("jsonwebtoken");

const userControllers = {};

//agent signup
userControllers.Signup = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }
    const user = await User.create({ ...req.body });
    const { _id: userId, type } = user;
    const token = jwt.sign({ userId }, "Secret-Key", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, type: user.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign up user" });
  }
};

// Admin Signin
userControllers.Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist." });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const token = jwt.sign({ id: existingUser.id }, "Secret-Key", {
      expiresIn: "1h",
    });
    res.json({ token, type: existingUser.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to sign in user" });
  }
};

module.exports = userControllers;
