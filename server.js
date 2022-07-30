//use node
//use a node framework called express





//create a node api


//grab all the things we need
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const mongodb = require('mongodb');

//Connection to Mongoose Database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/YamCamp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//configure our app
const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//app.use(authenticateUser());
const MongoClient = mongodb.MongoClient;



//create routes
app.get('/', (req, res) => {
    res.render('home')
});

//get all tweets


//find a tweet


//create a tweet

//update a tweet

//delete a tweet



//start our node server
app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})