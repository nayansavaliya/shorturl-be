const express = require('express');
const validUrl = require('valid-url');
const config = require('config');
const { nanoid } = require('nanoid');
const Joi = require('joi');
const route = express.Router();


const UrlMapping = require('./../models/urlMapping');
const asyncErrorMiddleware = require("./../middleware/asyncErrormiddleware")


const baseUrl = config.get('baseUrl')

const newUrlSchema = Joi.object({
    longUrl: Joi.string().required()
});

//Post api to shorten the Url
route.post('/', asyncErrorMiddleware(async (req, res) => {
    
    // Validate request body Schema
    const { error, value } = newUrlSchema.validate(req.body);
    if (error) {
        return res.status(400).send('Missing property "longUrl"')
    }


    // Validate input URl
    if (!validUrl.isUri(value.longUrl)) {
        return res.status(400).send('Invalid base URL')
    }
    
    // Check URL already present in DB
    const exsistingMaping = await UrlMapping.findOne({longUrl:value.longUrl});

    if(exsistingMaping){
        const result = await UrlMapping.findByIdAndUpdate({ _id: exsistingMaping.id }, {
            $inc: { shorteningAtempts: 1 }
            },{ new: true });
        res.status(200).send(result)
    }
    else{
        // Create new mapping
        const uniqueId = nanoid(10);
        const urlMap = new UrlMapping({
            uniqueId: uniqueId,
            longUrl: value.longUrl,
            shortUrl: baseUrl+'/'+ uniqueId,
            hits: 0,
            shorteningAtempts:1,
        });
        const result = await urlMap.save()
        res.status(200).send(result)
    }

 }));

 // Get api to get all mappings and its stats
 route.get('/stats', asyncErrorMiddleware(async (req, res) => {
    
    const mappings = await UrlMapping.find({}).select({longUrl:1,shortUrl:1,hits:1,shorteningAtempts:1,_id:0});
    res.status(200).send(mappings)
 }));

 
 module.exports = route;