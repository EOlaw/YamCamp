//use node

//use a node framework called express

//create a node api

//grab all the things we need
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const mongodb = require('mongodb');
const Yamcamp = require('./models/yamcamp')

//Connection to Mongoose Database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/Yamcamp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//configure our app
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


//app.use(authenticateUser());




//create routes
app.get('/', (req, res) => {
    res.render('home')
});

//get all tweets


//find a yamcamp
app.get('/', (req, res) => {
    res.render('home')
});
app.get('/yamcamps', async (req, res) => {
    const yamcamps = await Yamcamp.find({});
    res.render('yamcamps/index', { yamcamps })
});
app.get('/yamcamps/new', (req, res) => {
    res.render('yamcamps/new');
})
app.post('/yamcamps', async (req, res) => {
    const yamcamp = new Yamcamp(req.body.yamcamp);
    await yamcamp.save();
    res.redirect(`/yamcamps/${yamcamp._id}`)
})
app.get('/yamcamps/:id', async (req, res,) => {
    const yamcamp = await Yamcamp.findById(req.params.id)
    res.render('yamcamps/show', { yamcamp });
});
//create a tweet
app.get('/yamcamps/:id/edit', async (req, res) => {
    const yamcamp = await Yamcamp.findById(req.params.id)
    res.render('yamcamps/edit', { yamcamp });
})
//update a tweet
app.put('/yamcamps/:id', async (req, res) => {
    const { id } = req.params;
    const yamcamp = await Yamcamp.findByIdAndUpdate(id, { ...req.body.yamcamp });
    res.redirect(`/yamcamps/${yamcamp._id}`)
});
//delete a tweet
app.delete('/yamcamps/:id', async (req, res) => {
    const { id } = req.params;
    await Yamcamp.findByIdAndDelete(id);
    res.redirect('/yamcamps');
})












//start our node server
app.listen(3000, (req, res) => {
    console.log('listening on port 3000......')
})