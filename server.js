var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var cors = require(cors);
const { Schema } = mongoose;

app.use(bodyParser.json());
// app.use(cors());

var router = express.Router();

app.use('/api',router);

router.get('/',(req,res) => {
    res.send({"hitesh":"tikmani"});
});

// router.get('/db', (req, res) => {
//     res.send(connect());
// })


const MONGO_URI = 'mongodb://hiteshtikmani:hsetih123@ds129541.mlab.com:29541/travel-test-db'; 

mongoose.connect(MONGO_URI,(err,db)=>{
    if(err){console.log('ERROR AA GYA BHAI')};
    db.collection('places-test').findOne({},(err,result)=>{
        if(err){console.log('Coolection mein ERROR AA GYA BHAI')}
        router.get('/db',(req,res) => {
            res.send(result);
        });
    })
});

// let connect = async function getRoute() {
//     try {
//         let db = await mongoose.connect(MONGO_URI);
//         console.log(db);
//         // let res = await db.collection('places-test').findOne({});
//     } catch (error) {
//         console.log(error);
//     }   
// }

const PORT = 8000;
app.listen(PORT);