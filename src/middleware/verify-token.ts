import * as jwt from "jsonwebtoken";

module.exports = (req,res, next) => {
    const token = req.body.token || req.headers['x-access-token'] || req.query.token;
    if(token){
        jwt.verify(token, req.app.get('api_secret_key'), (error: Error, decoded) => {
            if(error){
                res.json({
                    status: false,
                    message: "Failed to authenticate token."
                });
            }else{
                req.decode = decoded;
                next(); 
            }
        });
    }else{
        res.json({
            status:false,
            message: "No token provided."
        });
    }
};