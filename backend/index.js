if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

// initializations
const app = express();
const db = require('./database');

// server setting
app.set('port', process.env.PORT);

// Middlewares
app.use(morgan('dev'));

const imageStorage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({imageStorage}).single());

app.use(express.urlencoded({extended: false})); 
app.use(express.json())

// Routes
app.use('/client', require('./routes/client.js'));

// static files
app.use(express.static(path.join(__dirname, '/public')));

// start server
app.listen(app.get('port'), () => {
    console.log('Server app and running on port: ',  app.get('port'));
});