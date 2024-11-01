const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('./models/usermodel')
const mongoose = require('mongoose');

mongoose.connect(keys.mongodb.dbURI)
.then(console.log('Connected'));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})


passport.use(
    new GoogleStrategy({ 
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret  
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id})
    .then((currentUser) => {
        if(currentUser) {

            console.log(`User is ${currentUser}`)
            done(null, currentUser)
        } else {
            new User({
                username: profile.displayName,
                googleID: profile.id,
                thumbnail: profile.photos[0].value,
                movies: [],
            }).save().then((newUser) => {
                console.log(`new user created: ${newUser}`);
                console.log()
                done(null, newUser);
            }) 
        }
    })
})   
)

