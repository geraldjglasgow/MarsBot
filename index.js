const Discord = require('discord.js');
const MessageCommands = require('./MessageCommands.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

const BOT_ID = '464615692646350848';

client.once('ready', () => {
    console.log("MarsBot started");
});

client.on('message', message => {
    if(message.member !== null) {
        if (message.member.user.id === BOT_ID) {
            return;
        }
        MessageCommands.tryCommand(message);
    }
});

function verifyMessage(message) {

}

client.login(token);