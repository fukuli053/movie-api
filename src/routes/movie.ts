import * as express from "express";
import {Request, Response, NextFunction} from "express";
import { runInNewContext } from "vm";

const router = express.Router();

//Model
const Movie = require("../models/Movie");

router
    .post('/', (Request: Request, Response: Response) => {
        const data = Request.body;
        const movie = new Movie(data);

        const promise = movie.save();
        promise.then((data) => {
            Response.json({status : 1});
        }).catch((error) => {
            Response.json(error);
        });

    })
    .get('/', (Request: Request, Response: Response) => {
        const promise = Movie.find({});
        promise.then((data) =>{
            Response.json(data);
        }).catch((error) => {
            Response.json(error);
        });
    }
);

router.get('/top10', (Request: Request, Response: Response) => {
    const promise = Movie.find({}).sort({imdb_score: -1}).limit(10);
    promise.then((data) =>{
        Response.json(data);
    }).catch((error) => {
        Response.json(error);
    });
});

router.get('/:movie_id', (Request: Request, Response: Response, next: NextFunction)=> {
        const movie_id = Request.params.movie_id;
        const promise = Movie.findById(movie_id);
        
        promise.then((data) => {
            if(!data){
                next({message: "The movie was not found.", code: 53});
            }else{
                Response.json(data); 
            }
        }).catch((error)=>{
            Response.json(error);
        });
    }).put('/:movie_id', (Request: Request, Response: Response, next: NextFunction) => {
        const movie_id = Request.params.movie_id;
        const movie = Request.body;
        const promise = Movie.findOneAndUpdate(movie_id, movie, {new : true});

        promise.then((data) => {
            if(!data){
                next({message: "The movie was not found.", code: 53});
            }else{
                Response.json({status : 1}); 
            }
        }).catch((error)=>{
            Response.json(error);
        });

    }).delete('/:movie_id', (Request: Request, Response: Response, next: NextFunction) => {
        const movie_id = Request.params.movie_id;
        const movie = Request.body;
        const promise = Movie.findByIdAndRemove(movie_id);

        promise.then((data) => {
            if(!data){
                next({message: "The movie was not found.", code: 53});
            }else{
                Response.json({status : 1}); 
            }
        }).catch((error)=>{
            Response.json(error);
        });

});

router.get('/between/:start/:end', (Request: Request, Response: Response) => {
    const {start, end} = Request.params;
    
    const promise = Movie.find({
        year: {
            "$gte": parseInt(start),
            "$lte": parseInt(end)
        }
    });
    promise.then((data) =>{
        Response.json(data);
    }).catch((error) => {
        Response.json(error);
    });
});



module.exports = router;