const express = require('express');
const session = require('express-session');
const app = express();
const authRouters = require('./routes/auth-routes');
const profileRouters = require('./routes/profile-routes');
const movieRouters = require('./routes/movie-routes');
const mongoose = require('mongoose');
const keys = require('./routes/setup/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path')
const Movie = require('./routes/setup/models/moviemodel');
const User = require('./routes/setup/models/usermodel');
const urlencoded = require('body-parser/lib/types/urlencoded');
const authCheck = require('./routes/profile-routes');

app.set('view engine', 'ejs')

let db; 

mongoose.connect(keys.mongodb.dbURI)
.then(console.log('Connected'));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))


app.use(passport.initialize());
app.use(passport.session());  
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/auth', authRouters);
app.use('/profile', profileRouters)
app.use('/movies', movieRouters)


app.get('/', (req, res) => {
  res.render('home',  {  user: req.user })  
})

app.post('/',  async (req, res) => {
    const newMovie = new Movie({
      rating: req.body.rating,
      title: req.body.title,
      description: req.body.description,
    })
    newMovie.save();
    await User.updateOne({ _id: req.user.id }, { $push: { movies: newMovie } });
    console.log('Movie Inserted Successfully.')
    res.redirect('/');
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})