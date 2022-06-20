const errorHandler = (error, req, res, next) => {
  if (error.statusCode === 401) {
    res.status(401).json({
      statusCode: 401,
      message: "Authentication failed",
    });
  } else if (error.name === "SequelizeValidationError") {
    let newError = error.errors.map((err) => err.message);
    res.status(400).json({
      statusCode: 400,
      message: newError[0],
    });
  } else if (error.statusCode === 404) {
    res.status(404).json({
      statusCode: 404,
      message: "Not Found",
    });
  } else if (error.statusCode === 403) {
    res.status(403).json({
      statusCode: 403,
      message: "Forbidden",
    });
  } else if (error.name === "INVALID_PASSWORD") {
    res.status(401).json({
      statusCode: 401,
      message: "Invalid password!",
    });
  } else if (error.name === "INVALID_EMAIL") {
    res.status(401).json({
      statusCode: 401,
      message: "Invalid email!",
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({
      statusCode: 401,
      message: "Invalid identification token",
    });
  } else if (error.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      statusCode: 400,
      message: "Email already exists",
    });
  } else {
    // console.log(error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = errorHandler;
