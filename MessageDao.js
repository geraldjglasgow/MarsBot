const mongodb = require('mongodb');

module.exports = {
    getPermaBans : function (message, callback) {
        let MongoClient = mongodb.MongoClient();
        let url = 'mongodb://localhost:27017/marsbot';
        MongoClient.connect(url, function (err, db) {
            if (err) {
                console.log("couldn't connect to " + "marsbot");
            } else {
                console.log("Connected to database " + "marsbot")
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
    }
};