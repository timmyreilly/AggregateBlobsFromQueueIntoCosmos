// Method: POST
// Body:
// {
//     "userId": "cc20a6fb-a91f-4192-874d-132493685376",
//     "productId": "4c25613a-a3c2-4ef3-8e02-9c335eb23204",
//     "locationName": "Sample ice cream shop",
//     "rating": 5,
//     "userNotes": "I love the subtle notes of orange in this ice cream!"
// }
var rp = require('request-promise-native');
var uuid = require('uuid/v4');
var mongoClient = require("mongodb").MongoClient;

var mongoClient = require("mongodb").MongoClient;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const DENIS_CONNECTION_STRING = process.env.DENIS_CONNECTION_STRING; 
mongoClient.connect(MONGO_CONNECTION_STRING, function (err, db) {
  //db.close();
});

var mongoOptions = {
    auth: {
        user: 'dekissel-oh',
        password: DENIS_CONNECTION_STRING
     }
}

var reviews = [];

module.exports = async function (context, req) {
    context.log('CreateRating Received a Request');

    if (!req.body) {
        return {
            status: 400,
            body: "Please pass a JSON body with your request"
        };
    }
    context.log('- body exists');

    if (!req.body.rating || !(0 <= req.body.rating && req.body.rating <= 5)) {
        return {
            status: 400,
            body: "Please submit a rating from 0-5"
        };
    }
    context.log('- rating is valid');

    if (req.body.userId && req.body.productId) {
        return rp('http://serverlessohuser.trafficmanager.net/api/GetUser?userId=' + req.body.userId)
        .then(function(body) {
            context.log("- userId is valid");
        }).then(function() {
            return rp('http://serverlessohproduct.trafficmanager.net/api/GetProduct?productId=' + req.body.productId);
        }).then(function(body) {
            context.log("- productId is valid");
            context.log("Creating rating entry");

            var review = {
                "id": uuid(),
                "userId": req.body.userId,
                "productId": req.body.productId,
                "timestamp": new Date().toISOString(),
                "locationName": req.body.locationName,
                "rating": req.body.rating,
                "userNotes": req.body.userNotes
            }

            return review;

        }).then(function(review) {
            return mongoClient.connect(mongoUri, mongoOptions)
                .then(function (client) {
                    client.db("reviewsdb").collection("reviews").insertOne(review)
                }).then(function(result) {
                    context.res = {
                        status: 200,
                        body: review
                    };
                })
        }).catch(function (err) {
            context.log(err);
            context.res = {
                status: 400,
                body: "Please check your userId & productId"
            };
            context.done();
        });
        
    } else {
        return {
            status: 400,
            body: "Please submit a valid userId & productId"
        };
    }

    return {
        status: 200,
        body: 'bbb'
    };
};