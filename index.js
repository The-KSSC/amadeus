// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { botToken } = require('./config.json');
const { htbToken } = require('./config.json');
const fetch=require("node-fetch");

async function getTeamRank(teamID){
	//we fetch the htb api to get team data
	let req=await fetch(`https://www.hackthebox.com/api/v4/rankings/team/ranking_bracket/${teamID}`, {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "authorization": `Bearer ${htbToken}`,
  },
  "body": null,
  "method": "GET"
});
	let res=await req.json()
	return res.data.rank
}

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.on("ready",() => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

//messageDetection
client.on("messageCreate",async message=>{

	//teamRank
	if(message.content=="give team rank pls sir"){
		let rank=await getTeamRank(5128)
		await message.channel.send("We're #"+rank)
	}
})

// Log in to Discord with your client's token
client.login(botToken);
