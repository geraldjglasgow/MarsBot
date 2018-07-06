// settings up library for discord bot
const sqlite3 = require('sqlite3').verbose();
const commando = require('discord.js-commando');
const assert = require('assert');
const bot = new commando.Client({
	unknownCommandResponse: false
});



// collection: champions, {name: 'Brand'}, {role: 'Mid'}, {role2: 'Support'}, {type: 'AP'}

// commands are split into groups
//bot.registry.registerGroup('league', 'League');
//bot.registry.registerGroup('general', 'General');
//bot.registry.registerDefaults();
//bot.registry.registerCommandsIn(__dirname + "/commands")
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
	let update = "UPDATE user_data SET post_count = post_count + 1 WHERE id = " + user_id;
	let insert = "INSERT OR IGNORE INTO user_data(id) values(" + user_id + ")";
	let db = new sqlite3.Database('discord.db', (err) => {
		if(err){
			return console.error(err.message);
		}
		db.run(insert);
		db.run(update);
		db.close();
	});
});
