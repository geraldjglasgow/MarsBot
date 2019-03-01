const Discord = require('discord.js');
const MessageCommands = require('./MessageCommands.js');
const {prefix, token, me, bot} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log("MarsBot started");
});

client.on('message', message => {
    try {
        if (message.member !== null) {
            if (message.member.user.id === bot) {
                return;
            }
            MessageCommands.tryCommand(message);
        }
    } catch(error){
        console.error(error);
        message.channel.send("something went wrong");
    } finally {

    }

});

function verifyMessage(message) {

}

client.login(token);