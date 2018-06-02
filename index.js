const express = require('express');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
// const session = require('express-session')

const app = express();

//Returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option
app.use(express.json());

//Express session middleware
// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   })
// );

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Map global promise
mongoose.promise = global.promise
//connect to mongodb with mongoose
mongoose.connect('mongodb://localhost:27017/mern')
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log('err'));

//Passport Config
require('./config/passport')(passport);

app.use('/auth', require('./controllers/auth'))


//To connect with front
app.use('/', express.static(path.join(__dirname, 'front/build')))
 app.use('/*', (req, res) => {
     res.sendFile(path.join(__dirname, 'front/build/index.html'))
 })

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
    if(err) {
        console.log('Something went wrong')
    }
    console.log('Server is listening on 3001')
})