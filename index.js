const commando = require('discord.js-commando');
const mongodb = require('mongodb');
const token = 'NDIwNjUxODE1MjgyMDE2MjU2.DYHaIQ.s4poWTyrhxMtc0QB0R7cU-yBqsg';
const bot = new commando.Client();




bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('opgg', 'Opgg');
bot.registry.registerGroup('post-counter', 'Post-counter');
bot.registry.registerDefaults(); // registers default commands like help
bot.registry.registerCommandsIn(__dirname + "/commands")
bot.login(token);

// every message sent will increment total messages sent for user
bot.on('message', message => {
    var user = message.author.id;
    var url = 'mongodb://localhost:27017';
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect(url,(err,database) =>{
        const db = database.db('discord');
        var coll = db.collection('user_info');
        coll.update({'id':user}, {$set: {id:user}, $inc:{post_count:1}}, {upsert: true});
    });
    if(message.content.toLowerCase() === 'hello')
        message.channel.send('Hey ' + message.author);
});
