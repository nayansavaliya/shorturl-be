const config = require('config');
const express = require('express');
const validUrl = require('valid-url');
const mongoose = require('mongoose');


const shortner = require('./routes/shortner');


const app = express();


//URl validation
if (validUrl.isUri('https://www.npmjs.com/package/valid-url')){
    console.log('Looks like an URI');
} else {
    console.log('Not a URI');
}

// shorten main logic




// mongoose.connect(config.get('mongoDbConnString')).then(()=> console.log())

app.use(express.json());
app.use('/api/shortner',shortner)

// app.listen(config.get('port'),config.get('host'), () => console.log("Listening port 3000…"));