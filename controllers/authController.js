import User from "../models/User.js";

const register = async (req, res) => {
  const user = await User.create(req.body);
  const { name, email, _id } = user;
  res.status(201).json({ name, email, _id });
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).json({ msg: "Invalid login or password" });
  }

  const compare = await user.comparePassword(req.body.password);

  if (!compare) {
    return res.status(401).json({ msg: "Invalid login or password" });
  }

  req.session.user = {
    email: user.email,
    name: user.name,
    id: user._id,
  };

  res.status(200).json({ msg: `You are logged in as ${user.name}.` });
};
const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ msg: "You have been logged out." });
};

//test controller
const dashboard = (req, res) => {
  res.status(200).json({
    msg: `Welcome in dashboard ${
      req.session.user ? req.session.user.name : "guest"
    }.`,
  });
};

export { register, login, logout, dashboard };
