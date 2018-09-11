const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session')

dotenv.config()
    
const app = express();

app.use(cookieParser())

app.use(session({
    secret: 'paljor129',
    cookie: {
        maxAge: 2628000000
    },
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const mongoUrl = process.env.DATABASE_URL;

mongoose.promise = global.promise
mongoose.connect(mongoUrl)
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./server/config/passport')(passport);

app.use('/auth', require('./server/controllers/auth'))
app.use('/annonce', require('./server/controllers/annonce'))
app.use('/comment', require('./server/controllers/comment'))


app.use('/', express.static(path.join(__dirname, './front/build')))
app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './front/build/index.html'))
})

app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send(err.message)
})

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
    if(err) {
        console.log('Something went wrong')
    }
    console.log('Server is listening on 3001')
})