const commando = require('discord.js-commando');
const mongodb = require('mongodb');

class PostCounter extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'post',
            group: 'general',
            memberName: 'post',
            description: 'number of posts',
            examples: ['post']
        });
    }

    // code run when command is called
    async run(message, args) {

    }
}

module.exports = PostCounter;
