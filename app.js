const express = require('express');
const app = express();
const studentRoute = require('./api/routes/student')
const facultyRoute = require('./api/routes/faculty')
const userRoute = require('./api/routes/user')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

mongoose.connect('mongodb+srv://akshaykhambe:4VbmJkUoUCJpmsOK@nodejs-test.pqfw2hw.mongodb.net/');

mongoose.connection.on('error',err=>{
    console.log('Connection Failed');
});

mongoose.connection.on('connected',connected=>{
    console.log('Connected with Database.....');
});

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/student',studentRoute);
app.use('/faculty',facultyRoute);
app.use('/user',userRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'URL not found'
    })
})

module.exports = app;