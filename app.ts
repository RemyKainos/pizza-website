const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const session = require("express-session");

import { Application, Request, Response } from "express";
import { Product } from "./model/product";

const app = express();

const appViews = path.join(__dirname, '/views');

const nunjucksConfig = {
    autoescape: true,
    noCache: true, 
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

app.set('view engine', "html");

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(session({secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 60000}}));

declare module "express-session" {
    interface SessionData{
        product: Product;
    }
}

const port = 5050
app.listen(port, () =>{
    console.log('Server listening on port '+port);
});

app.get('/', (req: Request, res: Response) => {
    res.render('pizza', {
        title: 'New Pizza Time!'
    });
})

require('./controller/productController')(app);
require('./controller/orderController')(app);