const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'rolls dice',
            examples: ['roll']
        });
    }

    // code run when command is called
    async run(message, args) {


    }
}

module.exports = DiceRollCommand;