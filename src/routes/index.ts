import * as express from "express";
import {Request, Response} from "express";

const router = express.Router();

/*GET for Home*/
router.get('/', (Request: Request, Response: Response) => {
    Response.send("selam");
});

module.exports = router;