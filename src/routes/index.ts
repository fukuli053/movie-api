import * as express from "express";
import {Request, Response} from "express";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const router = express.Router();

//User Model
const User = require('../models/User');

/*GET for Home*/
router.get('/', (Request: Request, Response: Response) => {
    Response.send("selam");
});

router.post('/register', (Request: Request, Response: Response) => {
    const {username, email, password} = Request.body; 

    bcrypt.hash(password,10).then((hash) => {
        const user = new User({
            username,
            password : hash,
            email
        });
        const promise = user.save();
    
        promise.then((data) => {
            Response.json({status: 1});
        }).catch((error) => {
            Response.json(error);
        });
    });

});

router.post('/login', (Request: Request, Response: Response) => {
    const {email, password} = Request.body;
    User.findOne({
        email
    },(error, user) => {
        if(error)
            throw error;
        if(!user){
            Response.json({
                status: false,
                message: "Authentication failed, user not found."
            });
        }else{
            bcrypt.compare(password, user.password).then((result) => {
                if(!result){
                    Response.json({
                        status: false,
                        message: "Authentication failed, wrong password."
                    });
                }else{
                    const payload = {
                        email
                    };
                    const token = jwt.sign(payload, Request.app.get("api_secret_key"), {
                        expiresIn: 720 //12 Hour
                    });

                    Response.json({
                        status: true,
                        token
                    });

                }
            });
        }
    });
})

module.exports = router;