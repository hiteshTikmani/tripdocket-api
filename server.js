var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

var router = express.Router();

app.use('/api',router);

router.get('/',(req,res) => {
    res.send({"hitesh":"tikmani"});
});

var PORT = 8080;
app.listen(PORT);