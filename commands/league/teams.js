const commando = require('discord.js-commando');
const mongodb = require('mongodb');
const assert = reuire('assert');


class Team extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'teams',
            group: 'league',
            memberName: 'teams',
            description: 'assigns teams and champions to voice channel',
            examples: ['get']
        });
    }

    async run(message, args) {
        var mems = message.member.voiceChannel.members;
        let names = [];
        for (let [username, User] of mems) {
            names.push(User.displayName);
        }
        let team1 = parseInt(names.length / 2);
        let team2 = names.length - team1;

        console.log(team1 + " " + team2);

        var url = 'mongodb://localhost:27017';
        var MongoClient = mongodb.MongoClient;
        MongoClient.connect(url,(err,database) =>{
            const db = database.db('discord');
            var coll = db.collection('champions');
            coll.aggregate({$sample: {size:1}}).toArray(function (err, result) {
                let i = 0;
                message.channel.send("**Team 1**");
                for (i = 0; i < team1; i++) {
                    var index = Math.floor(Math.random() * (result.length + 1));
                    message.channel.send(names[i] + ": " + result[index].name);
                }
                message.channel.send("**Team 2**");
                for (i = names.length; i > team2; i--) {
                    var index = Math.floor(Math.random() * (result.length + 1));
                    message.channel.send(names[i-1] + ": " + result[index].name);
                }             
            })
            database.close();
        });
    }
}

module.exports = Team;
