const isAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(400).json({ msg: "You are not logged in!" });
  }

  next();
};
export default isAuth;
