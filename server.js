//Grabbing all the variables
const express = require('express');
const path = require('path');
const app = express();
//const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Yamcamp = require('./models/yamcamp')

//set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


//configure the app
//app.use(express.json());
//app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
//Use to view images on the websites
//app.use('/img', express.static(__dirname + 'public/img'))


//Connection to Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/Yamcamp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



//create routes
app.get('/', (req, res) => {
    res.render('home')
})
app.get('/yamcamps', async (req, res) => {
    const yamcamps = await Yamcamp.find({});
    res.render('yamcamps/index', { yamcamps })
})
app.get('/yamcamps/new', (req, res) => {
    res.render('yamcamps/new');
})

app.post('/yamcamps', async (req, res) => {
    const yamcamp = new Yamcamp(req.params.yamcamp);
    await yamcamp.save();
    res.redirect(`/yamcamps/${yamcamp._id}`)
})

app.get('/yamcamps/:id', async (req, res) => {
    const yamcamp = await Yamcamp.findById(req.params.id)
    res.render('yamcamps/show', { yamcamp})
})

app.get('/yamcamps/:id/edit', async (req, res) => {
    const yamcamp = await Yamcamp.findById(req.params.id)
    res.render('yamcamps/edit', { yamcamp });
})

app.put('/yamcamps/:id', async (req, res) => {
    const { id } = req.params;
    const yamcamp = await Yamcamp.findByIdAndUpdate(id, { ...req.body.yamcamp });
    res.redirect(`/yamcamps/${yamcamp._id}`)
});

app.delete('/yamcamps/:id', async (req, res) => {
    const { id } = req.params;
    await Yamcamp.findByIdAndDelete(id);
    res.redirect('/yamcamps');
})





//
app.listen(3001, () => {
    console.log('Serving on port 3001.......')
})