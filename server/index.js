const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()

const app = express();

const mongoUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/mern';

mongoose.promise = global.promise
mongoose.connect(mongoUrl)
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log('err'));


//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     req.db = db;
//     next();
// })

//Passport Config
// require('./config/passport')(passport);

app.use('/auth', require('./controllers/auth'))
app.use('/create', require('./controllers/create'))


//To connect with front
app.use('/', express.static(path.join(__dirname, '../front/build')))
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front/build/index.html'))
})

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
    if(err) {
        console.log('Something went wrong')
    }
    console.log('Server is listening on 3001')
})