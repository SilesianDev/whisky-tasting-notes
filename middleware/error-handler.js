const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong, please try later",
  };

  if (err.name === "ValidationError") {
    defaultError.statusCode = 400;
    defaultError.msg = err.message;
  }

  //mongo unique value handle
  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.msg = "e-mail address is already taken";
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
