//Grabbing all the variables
const express = require('express');
const path = require('path');
const app = express();
//const mongoose = require('mongoose');
const methodOverride = require('method-override');
//const Yamcamp = require('./models/yamcamp')

//set the view engine to ejs
app.set('view engine', 'ejs');


//configure the app
app.use(express.json());
app.use(express.static('public'))
app.use('/img', express.static(__dirname + 'public/img'))


//Connection to Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



//create routes
app.get("/", (req, res) => {
    res.render('home')
})




//
app.listen(3000, () => {
    console.log('Serving on port 3000.......')
})