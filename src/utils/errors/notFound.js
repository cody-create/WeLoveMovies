function notFound(req, res, next) {
  console.log("line 2");
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
