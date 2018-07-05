const commando = require('discord.js-commando');
const mongodb = require('mongodb');

class PostCounter extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'post',
            group: 'general',
            memberName: 'post',
            description: 'number of posts',
            examples: ['post']
        });
    }

    // code run when command is called
    async run(message, args) {
        var user = message.author.id;
        var url = 'mongodb://localhost:27017';
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url,(err,database) =>{
            const db = database.db('discord');
            var coll = db.collection('user_info');
            coll.find({id: user}).toArray(function (err, result) {
                if(result.length) {
                    message.channel.send(message.author.username + ' has sent ' + result[0].post_count + ' messages.');
                } else {
                    message.send('No data found');
                }
            })
        });
    }
}

module.exports = PostCounter;
