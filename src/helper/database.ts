import * as mongoose from "mongoose";

const uri : string = "mongodb://furkanergun:12345678Bb@ds353457.mlab.com:53457/heroku_9ccrjms4"; 

module.exports = () => {
    mongoose.connect(uri, { useNewUrlParser: true });
    mongoose.connection.on('open', () => {
      console.log("MongoDB: Database Connection Successful !");
    });
    mongoose.connection.on('error', (error) => {
      console.log("MongoDB: Error", error);
    });
};