//load modules/configs
const fetch=require("node-fetch");
const { htbToken } = require('../config.json');


module.exports={
    name: "getTeamRank",
    description: "returns team rank",

    async run(client){
        //look for the correct command
        client.on("messageCreate",async message=>{
            if(message.content=="getTeamRank"){
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
                //send the message
                message.channel.send("We're #"+rank)
            }
        })

    }

}