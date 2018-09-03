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
        if(err){console.log('DB Connection error')}
        router.get('/db',(req,res) => {
            res.send(result);
        });
    })
});

if(process.env.NODE_ENV === 'production'){
    app.use('/',express.static('client/buid'));

    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);