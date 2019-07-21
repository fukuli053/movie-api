import * as express from "express";
import {Request, Response} from "express";

const router = express.Router();

//Model
const Movie = require("../models/Movie");


router.post('/', (Request: Request, Response: Response) => {
    //const {title, category, imdb_score, country, year} = Request.body; 
    const data = Request.body;
    const movie = new Movie(data);

    movie.save((error, data) => {
        if(error){
            Response.json(error);
        }
        Response.json(data);
    });

});

module.exports = router;