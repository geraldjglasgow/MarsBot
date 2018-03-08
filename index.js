// settings up library for discord bot
const mongodb = require('mongodb');
const commando = require('discord.js-commando');
const token = 'NDIwNjUxODE1MjgyMDE2MjU2.DYHaIQ.s4poWTyrhxMtc0QB0R7cU-yBqsg';
const bot = new commando.Client();

/* THINGS TO-DO
    1. implement warnings befor kick -> ban
    2. handle privilege level too low
    3. look for better word blacklist system
    4. implement champion roll -> !roll adc output:Caitlyn || !roll output:ziggs (random champion)
    5. get op.gg api to output summoner info -> !opgg sslmummy output: (prints top 5 champions in format) zed 21W 15L 58% winrate
*/
// collection: champions, {name: 'Brand'}, {role: 'Mid'}, {role2: 'Support'}, {type: 'AP'}


// commands are split into groups
bot.registry.registerGroup('random', 'Random');
bot.registry.registerGroup('opgg', 'Opgg');
bot.registry.registerGroup('post-counter', 'Post-counter');
bot.registry.registerDefaults(); // registers default commands like help
bot.registry.registerCommandsIn(__dirname + "/commands")
bot.login(token);

// every message sent will increment total messages sent for user
// every message will be checked for racist words
bot.on('message', message => {
    var user = message.author;
    var user_id = message.author.id;
    var msg = message.content.toLowerCase();

    if(user_id == 420651815282016256){ //makes sure not to analyze what the bot says
        return;
    }
    // words that will get you banned from the server. NEED BETTER SYSTEM!
    var words = ['nigger', 'n!gger', 'n!gg3r', 'nigg3r', 'nigga', 'n!gga', 'n!gg@',
    'nigg@', 'n@gg@', 'niger','n!ger','n!g3r','nig3r','niga','n!ga','nig@','n!g@',
        'nagga','n@gg@','n@gga','nagg@','nig','negger','n3gger','negg3r','n3gg3r',
    'n3gga','negg@','megger','m3gger','m3gg3r','m!gger','m!gg3r','migger','migg3r',
        'miger','m!ger','mig3r','m!g3r','migga','m!gga','migg@','m!gg@','miga','m!ga','m!g@','mig@'];

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
        var coll = db.collection('user_info');
        coll.updateOne({'id':user_id}, {$set: {id:user_id}, $inc:{post_count:1}}, {upsert: true});
        database.close();
    });
});
