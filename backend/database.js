const mongoose = require('mongoose');

const dbPath = process.env.MONGODB_URI;

mongoose.connect(dbPath, {
    useNewUrlParser: true
})
    .then(db => console.log('Succesfully connected to Database: ', dbPath))
    .catch(err => console.error('Error on DB connection', err));