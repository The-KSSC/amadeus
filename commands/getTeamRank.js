//load modules/configs
const fetch=require("node-fetch");
const { htbToken } = require('../config.json');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
        data: new SlashCommandBuilder()
            .setName('team')
            .setDescription('Returns team rank.'),
        async execute(interaction) {
            //fetch the htb api to get team data
            let req=await fetch("https://www.hackthebox.com/api/v4/rankings/team/ranking_bracket/5128", {
                "headers": {
                "accept": "application/json, text/plain, */*",
                "authorization": `Bearer ${htbToken}`,
                },
                "body": null,
                "method": "GET"
            });
            let res=await req.json()
            let rank= res.data.rank
                
            await interaction.reply('We\'re #'+rank);
        },
};

