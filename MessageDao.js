const mongodb = require('mongodb');
const PREFIX = "!";

module.exports = {
    getPermaBans : function (message, callback) {
        let MongoClient = mongodb.MongoClient();
        let url = 'mongodb://localhost:27017/marsbot';
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("couldn't connect to " + "marsbot");
            }

            db.collection('permabans').find().toArray(function (err, result) {
                let listOfChampions = [];
                for (let i = 0; i < result.length; i++) {
                    if (result[i] !== null) {
                        listOfChampions.push(result[i].champion);
                    }
                }
                callback(listOfChampions);
            });
            db.close();
        });
    },

    addPerma : function (message) {
        const args = message.content.slice(PREFIX.length).trim().tokenize();
        let MongoClient = mongodb.MongoClient();
        let url = 'mongodb://localhost:27017/marsbot';
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("couldn't connect to " + "marsbot");
            }

            let promise = db.collection('permabans').insertOne({champion : args[1].toLowerCase()});
            console.log("tried to add " + args[1].toLowerCase());
            db.close();
        });
    },

    removePerma : function (message) {
        const args = message.content.slice(PREFIX.length).trim().tokenize();
        let MongoClient = mongodb.MongoClient();
        let url = 'mongodb://localhost:27017/marsbot';
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("couldn't connect to " + "marsbot");
            }

            db.collection('permabans').removeOne({champion : args[1].toLowerCase()});
            console.log("tried to remove " + args[1].toLowerCase());
            db.close();
        });
    }
};