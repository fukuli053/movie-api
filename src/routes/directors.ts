import * as express from "express";
import * as mongoose from "mongoose";
import { Request, Response}  from "express";
import { NextFunction } from "connect";

const router = express.Router();

//Model
const Director = require('../models/Director');

router.get('/', (Request: Request,Response: Response) =>{
    const promise = Director.aggregate([
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

    promise.then((data) => {
        Response.json(data);
    }).catch((error) => {
        Response.json(error);
    });

}).post('/', (Request: Request,Response: Response) =>{
    const data = Request.body;
    const director = new Director(data);

    const promise = director.save();
    promise.then((data) => {
        Response.json(data);
    }).catch((error) => {
        Response.json(error);
    }); 
});

router.get('/:director_id', (Request: Request,Response: Response,next: NextFunction) =>{
    const director_id: Number = Request.params.director_id; 
    const promise = Director.aggregate([
        {
            $match: {
                '_id' : mongoose.Types.ObjectId(director_id)
            }
        },
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'director_id',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio'
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);
    
    promise.then((data) => {
        if(!data){
            next({message: "The director was not found.", code: 53});
        }else{
            Response.json(data); 
        }
    }).catch((error)=>{
        Response.json(error);
    });

}).put('/:director_id', (Request: Request,Response: Response) =>{
    const director_id: Number = Request.params.director_id; 
    const body = Request.body; 
    const promise = Director.findByIdAndUpdate(director_id,body);

    promise.then((data) => {
        Response.json({status : 1});
    }).catch((error) => {
        Response.json(error);
    }); 
}).delete('/:director_id', (Request: Request,Response: Response) =>{
    const director_id: Number = Request.params.director_id; 
    const promise = Director.findByIdAndRemove(director_id);

    promise.then((data) => {
        Response.json({status : 1});
    }).catch((error) => {
        Response.json(error);
    }); 
});


module.exports = router;
