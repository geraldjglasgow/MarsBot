const commando = require('discord.js-commando');
const request = require('request');


class OPGG extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'champ',
            group: 'opgg',
            memberName: 'champ',
            description: 'gets stats on champion for league of legends',
            examples: ['get']
        });
    }

    // code run when command is called
    async run(message, args) {
        request.get('http://na.op.gg/userName=sslmummy', function(err, response, body) {
            console.log('run');
            console.log(body);
        });

    }
}

module.exports = OPGG;