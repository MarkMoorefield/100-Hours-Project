const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    googleID: String,
    thumbnail: String,
    movies: [],
})




const User = mongoose.model('User', userSchema);
module.exports = User;
