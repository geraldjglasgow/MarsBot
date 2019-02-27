const Mongo = require('./MessageDao.js');
const request = require('request');
const cheerio = require('cheerio')
const PREFIX = "!";


module.exports = {
    tryCommand : function(message){
        if (message.content.startsWith(PREFIX + 'permabans')) {
            getPermaBans(message);
        }

        if(message.content.startsWith(PREFIX + 'rank')){
            getRank(message);
        }

        if(message.content.startsWith(PREFIX + 'kick')){
            if(message.displayName === 'SSLMummy'){
                kick(message);
            } else {
                message.channel.send('You don\'t have permissions to kank');
            }
        }
    }

};

function getPermaBans (message) {
    Mongo.getPermaBans(message, function (listOfChampions) {
        listOfChampions.sort();
        let championsString = "";
        for (let i=0;i<listOfChampions.length;i++) {
            championsString += listOfChampions[i] + " \n";
        }

        if (listOfChampions.length && listOfChampions != null) {
            message.channel.send(championsString);
        }
    });
}

function getRank(message){
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    request('https://na.op.gg/summoner/userName='+args[1], function (error, response, body) {
        const $ = cheerio.load(body);
        let ranking  = $('.TierRank').first().text();
        let position  = $('.Position').first().text();
        let winrate  = $('.winratio').first().text();
        position = position.replace(/^\s+/g, '').toLowerCase();
        let pos = position.split(/ +/g);
        let temp = pos[1]+" "+pos[2].trim();
        winrate = winrate.replace(/^\s+/g, '').toLowerCase();
        let pos1 = winrate.split(/ +/g);
        pos1[0] = pos1[0].capitalize();
        pos1[1] = pos1[1].capitalize();
        pos1[2] = pos1[2].trim();

        message.channel.send("**"+pos[0].capitalize()+"** " + "**"+ranking+"**\n" + "*"+temp+"*" +" " + "*" + pos1[0] + " "+ pos1[1] + " "+ pos1[2] + "*");
    });
}

function kick(message) {
    let member = message.mentions.members.first();
    member.kick().then((member) => {
        message.channel.send(":wave " + member.displayName + " has been kanked!");
    })
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};