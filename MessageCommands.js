const Mongo = require('./MessageDao.js');
const {prefix, token, me, bot, mike} = require('./config.json');
const request = require('request');
const cheerio = require('cheerio');
const PREFIX = "!";


module.exports = {
    tryCommand : function(message){
        let parts = message.content.tokenize();
        let command = parts[0];
        if (command === (PREFIX + 'perma')) {
            getPermaBans(message);
        }

        if(command === (PREFIX + 'rank')){
            getRank(message);
        }

        if(command === (PREFIX + 'permaremove')){
            Mongo.removePerma(message);
        }

        if(command === (PREFIX + 'permaadd')){
            Mongo.addPerma(message);
        }

        if(command === (PREFIX + 'kick')){
            if(message.member.user.id === mike && message.mentions.members.first() !== null){
                let member = message.mentions.members.first();
                member.kick().then((member) => {
                    message.channel.send(":wave " + member.displayName + " has been kanked!");
                });
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
            championsString += listOfChampions[i].capitalize() + " \n";
        }

        if (listOfChampions.length && listOfChampions != null) {
            message.channel.send(championsString);
        }
    });
}

function getRank(message){
    const args = message.content.slice(PREFIX.length).trim().tokenize();
    request('https://na.op.gg/summoner/userName='+args[1], function (error, response, body) {
        const $ = cheerio.load(body);
        let ranking  = $('.TierRank').first().text();
        let position  = $('.Position').first().text();
        let winrate  = $('.winratio').first().text();
        position = position.removeLeadingSpaces().toLowerCase();

        message.channel.send();

        if(ranking !== 'Unranked') {
            message.channel.send("**" + position.getRole() + "** " + "**" + ranking.getRank() + "**\n" + "*" + position.getLane() + "*" + " " + winrate.getWinRate());
        } else {
            message.channel.send("**" + ranking + "**");
        }
    });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.getLane = function() {
    this.removeLeadingSpaces().toLowerCase();
    let parts = this.tokenize();
    parts[2] = parts[2].trim();
    return parts[1] + " " + parts[2];
};

String.prototype.getRole = function() {
    this.removeLeadingSpaces().toLowerCase();
    let pos = this.tokenize();
    return pos[0].capitalize();
};

String.prototype.getWinRate = function() {
    this.removeLeadingSpaces().toLowerCase();
    let parts = this.tokenize();
    parts[0] = parts[0].capitalize();
    parts[1] = parts[1].capitalize();
    parts[2] = parts[2].trim();
    return "*" + parts[0] + " " + parts[1] + " " + parts[2] + "*";
};

String.prototype.getRank = function() {
    this.removeLeadingSpaces();
    let parts = this.split(/ +/g);
    parts[0].replace(/\s+/g, '');
    parts[1].replace(/\s+/g, '');
    return parts[0] + " " + parts[1];
};

String.prototype.tokenize = function(){
    return this.split(/ +/g);
};

String.prototype.removeLeadingSpaces = function() {
    return this.replace(/^\s+/g, '');
};