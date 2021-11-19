const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const validUrl = require('valid-url');



const shortner = require('./routes/shortner');
const UrlMapping = require('./models/urlMapping');
const asyncErrorMiddleware = require("./middleware/asynErrormiddleware")



// Create app
const app = express();


// Db connection
mongoose.connect(config.get('mongoDbConnString'))
.then(()=> console.log("Connection established to MongoDD"))
.catch(err => console.log("Failed while connecting MongoDB"))

//middlewares
app.use(express.json());
app.use('/api/shortner',shortner)

//redirect route
app.get('/:unique', asyncErrorMiddleware(async (req, res) => {
    const urlMapping = await UrlMapping.findOne({
            uniqueId: req.params.unique
        })
    if (urlMapping) {
        return res.redirect(urlMapping.longUrl)
    } else {
        return res.status(404).json('URL Not Found')
    }
    }
 ));

 // error handling middleware
 app.use(function(err,req,res,next){
    // Log errors hear
    console.log(err)
    res.status(500).send("Server Error")
 });


//Starting app server
app.listen(config.get('port'),config.get('host'), () => console.log("Listening port 3000…"));




