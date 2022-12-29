const { Client, GatewayIntentBits } = require('discord.js');
const fetch=require("node-fetch");
const { botToken,htbToken } = require('../config.json');


module.exports={
    name: "getTeamRank",
    description: "returns team rank",

    async run(client){

        client.on("messageCreate",async message=>{
            if(message.content=="getTeamRank"){
                //we fetch the htb api to get team data
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
                message.channel.send("We're #"+rank)
            }
        })

    }

}