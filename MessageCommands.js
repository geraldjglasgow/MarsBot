const Mongo = require('./MessageDao.js');
const PREFIX = "!";


module.exports = {
    tryCommand : function(message){
        if (message.content.startsWith(PREFIX + 'permabans')) {
            getPermaBans(message);
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
