import * as express from "express";
import * as bodyparser from "body-parser";

const indexRoute = require('./routes/index'); 
const movieRoute = require('./routes/movies'); 
const directorRoute = require('./routes/directors'); 

const PORT = 8080;
const app = express();

//Database Connection
const db = require("./helper/database")();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//Routes
app.use('/', indexRoute);
app.use('/api/movies', movieRoute);
app.use('/api/directors', directorRoute);

app.listen(PORT, () => {
    console.log(`Uygulama ${PORT}'unda çalışıyor.`);
});
 
