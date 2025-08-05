const notFoundHandler = (req, res, next) => {
  const error = new Error(`❌ Resource not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;

  console.error(`🚨 Error ${status} on ${req.method} ${req.originalUrl}`);
  console.error(`📝 Message: ${error.message}`);
  if (status === 500) {
    console.error(`📄 Stack Trace:\n${error.stack}`);
  }

  res.status(status).json({
    message: error.message || "Internal Server Error",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
