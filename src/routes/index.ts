import * as express from "express";
import {Request, Response} from "express";
import * as bcrypt from "bcryptjs";

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

module.exports = router;