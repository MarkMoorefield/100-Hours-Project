const Movie = require('../routes/setup/models/moviemodel');

module.exports = {
    getMovie: async (req, res) => {
      try {
        const post = await Movie.findById(req.params.id);
        res.render("movie.ejs", { movie: movie, user: req.user });
      } catch (err) {
        console.log(err);
      }
    },
};