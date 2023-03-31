const service = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  console.log(movie);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  console.log("line 12");
  next({
    status: 404,
    message: "Movie cannot be found",
  });
}

async function list(req, res) {
  const { is_showing } = req.query;
  if (is_showing) {
    const listShowing = await service.listShowing();
    return res.json({ data: listShowing });
  }
  const list = await service.list();
  res.json({ data: list });
}

async function read(req, res) {
  console.log("line 30");
  res.json({ data: res.locals.movie });
}

async function readTheaters(req, res) {
  const { movieId } = req.params;
  const movieTheater = await service.readTheaters(movieId);
  res.json({ data: movieTheater });
}

async function readReviews(req, res) {
  const { movieId } = req.params;
  const movieReview = await service.readReviews(movieId);
  res.json({ data: movieReview });
}

module.exports = {
  list,
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
};
