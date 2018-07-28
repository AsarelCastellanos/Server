var express = require("express");
var mongodb = require("mongodb");
var bodyParser = require("body-parser");
var cors = require("cors");
var jsonparser = bodyParser.json({ limit: '200mb' });
var app = express();
var mongoose = require("mongoose");

var socialGatherings;
var festival;
var performance;

// Connecting with Collections
mongoose.connect('mongodb://admin:wu4azare@ds259001.mlab.com:59001/events-holder', { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log("Error Connecting");
        process.exit(1);
        throw err;
    } else {
        console.log("connected to our database")
        socialGatherings = db.collection("socialgatherings");
        festival = db.collection("festival");
        performance = db.collection("performance");
    }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));


// Makes sure it works

app.get("/", function (req, res) {
    res.sendStatus(200);
})

// Gets First Collection - Social Gatherings

app.get("/socialGatherings", function (req, res) {
    socialGatherings.find().toArray(function (err, docs) {
        if (err) {
            throw err;
            res.sendStatus(500);
            console.log(err)
        } else {
            var result = docs.map(function (data) {
                return data;
            })
            res.json(result);
        }
    })
})

// Gets Second Collection - Festivals

app.get("/festivals", function (req, res) {
    festival.find().toArray(function (err, docs) {
        if (err) {
            throw err;
            res.sendStatus(500);
        } else {
            var result = docs.map(function (data) {
                return data;
            })
            res.json(result);
        }
    })
})

// Gets Third Collection - Performance

app.get("/performance", function (req, res) {
    performance.find().toArray(function (err, docs) {
        if (err) {
            throw err;
            res.sendStatus(500);
        } else {
            var result = docs.map(function (data) {
                return data;
            })
            res.json(result);
        }
    })
})


// Post Saved Events

// app.post("/saveEvent", jsonparser, function(req,res){
// 	console.log(req.body);
// 	var name = req.body.name;
// 	var event = req.body.event;
// 	users.findOne({
// 		"name": "A"
// 	}, function(err,docs){
// 		var counter = 0
// 		for ( i=0; i<docs.savedEvents.length; i++ ){
// 			if (docs.savedEvents[i].Name == req.body.event.Name){
// 				counter = 1;
// 				break
// 			}
// 		}
// 		if (counter == 0) {
// 			users.findOneAndUpdate({
// 		"name": name
// 	},
// 	{
// 		$push: {"savedEvents":event }
// 	}, function(err,docs){
// 		if(err){
// 			res.sendFile(err);
// 		}else{
// 			res.sendStatus(200);
// 		}
// 	})
// 		}else {
// 			res.send("Already saved")
// 		}
// 	})
// })


// Get Saved Events

// app.get('/returnSavedEvents',jsonparser,function(req,res){

// 	users.findOne({
// 		"name": "John Doe"
// 	},function(err,docs){
// 		if(err){
// 			res.send(err);
// 		}else{
// 			res.send(docs);
// 		}

// 	})
// })

var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log('Listening on port ' + port);
});