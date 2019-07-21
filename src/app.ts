import * as express from "express";
import * as bodyparser from "body-parser";

const indexRoute = require('./routes/index'); 
const movieRoute = require('./routes/movie'); 

const PORT = 8080;
const app = express();

//Database Connection
const db = require("./helper/database")();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//Routes
app.use('/', indexRoute);
app.use('/api/movies', movieRoute);

app.listen(PORT, () => {
    console.log(`Uygulama ${PORT}'unda çalışıyor.`);
});
 
