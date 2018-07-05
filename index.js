// settings up library for discord bot
const mongodb = require('mongodb');
const commando = require('discord.js-commando');
const token = 'NDIwNjUxODE1MjgyMDE2MjU2.DYHaIQ.s4poWTyrhxMtc0QB0R7cU-yBqsg';
const bot = new commando.Client();

// collection: champions, {name: 'Brand'}, {role: 'Mid'}, {role2: 'Support'}, {type: 'AP'}


// commands are split into groups
bot.registry.registerGroup('league', 'League');
bot.registry.registerGroup('general', 'General');
//bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands")
bot.login(token);

bot.on('message', message => {
    var user = message.author;
    var user_id = message.author.id;
    var msg = message.content.toLowerCase();

    if(user_id == 420651815282016256){ // ignore bot messages
        return;
    }
    // NEED BETTER SYSTEM!
    var words = ['hate'];

    for(var word of words){
        if(msg.includes(word)){
            message.delete();
            message.guild.member(message.author).kick('racism');
        }
    }

    // accessing mongodb to update post count
    var url = 'mongodb://localhost:27017';
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect(url,(err,database) =>{
        const db = database.db('discord');
        var coll = db.collection('userInfo');
        coll.updateOne({'id':user_id}, {$set: {id:user_id}, $inc:{post_count:1}}, {upsert: true});
        database.close();
    });
});
