"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var nunjucks = require("nunjucks");
var session = require("express-session");
var app = express();
var appViews = path.join(__dirname, '/views');
var nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};
nunjucks.configure(appViews, nunjucksConfig);
app.set('view engine', "html");
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'NOT HARDCODED SECRET', cookie: { maxAge: 60000 } }));
var port = 5050;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
app.get('/', function (req, res) {
    res.render('pizza', {
        title: 'New Pizza Time!'
    });
});
require('./controller/productController')(app);
require('./controller/orderController')(app);
//# sourceMappingURL=app.js.map