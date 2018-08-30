const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()
    
const app = express();

app.use(passport.initialize());
// app.use(passport.session());

const mongoUrl = process.env.DATABASE_URL;

mongoose.promise = global.promise
mongoose.connect(mongoUrl)
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));


//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     req.db = db;
//     next();
// })

//Passport Config
// require('./config/passport')(passport);

app.use('/auth', require('./server/controllers/auth'))
app.use('/annonce', require('./server/controllers/annonce'))


//To connect with front
app.use('/', express.static(path.join(__dirname, './front/build')))
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './front/build/index.html'))
})

app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send(err.message)
})

const port = 3001;

app.listen(port, (err) => {
    if(err) {
        console.log('Something went wrong')
    }
    console.log('Server is listening on 3001')
})