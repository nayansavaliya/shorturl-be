const mongoose = require('mongoose')
const config = require('config');

// // Db connection
// mongoose.connect(config.get('mongoDbConnString'))
// .then(()=> console.log("Connection established to MongoBD"))
// .catch(err => console.log("Failed while connecting MongoDB"))


// Schema
const urlMappingSchema = new mongoose.Schema({
    uniqueId: String,
    longUrl: String,
    shortUrl: String,
    hits: { type: Number,  default: 0 },
    shorteningAtempts:{ type: Number, default: 0 },
    meta: {
        created_at: { 
            type: Date,
            required: true, 
            default: Date.now 
        }
    }
})

// creating model a model
const UrlMapping = mongoose.model('UrlMapping', urlMappingSchema)



module.exports = UrlMapping;