const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res) {
  const theatersAndMovies = await service.list();
  res.status(200).json({ data: theatersAndMovies });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
};
