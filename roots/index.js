//const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./rootHelpers');
const Yamcamp = require('../models/yamcamp');

//Connection to Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://EOlaw146:Olawalee_.146@cluster0.4wv68hn.mongodb.net/Yamcamp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const rootDB = async () => {
    await Yamcamp.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const yam = new Yamcamp({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: ' https://source.unsplash.com/collection/483251 ',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo optio alias voluptatem deleniti explicabo quas error, nisi dolor voluptatum deserunt dicta inventore ab blanditiis et dolorum similique quibusdam quos ea.',
            price
        })
        await yam.save();
    }
}

rootDB().then(() => {
    mongoose.connection.close();
})