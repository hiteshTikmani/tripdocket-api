var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var keys = require('./config/keys')

const { Schema } = mongoose;

app.use(bodyParser.json());

var router = express.Router();

app.use('/api',router);

router.get('/',(req,res) => {
    res.send({"hitesh":"tikmani"});
}); 

mongoose.connect(keys.mongoURI,(err,db)=>{
    if(err){console.log('ERROR AA GYA BHAI')};
    db.collection('places-test').findOne({},(err,result)=>{
        if(err){console.log('Coolection mein ERROR AA GYA BHAI')}
        router.get('/db',(req,res) => {
            res.send(result);
        });
    })
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);