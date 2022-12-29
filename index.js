// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { botToken,htbToken } = require('./config.json');
const fetch=require("node-fetch");
const fs=require("fs")

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] });

// When the client is ready, run this code (only once)
client.on("ready",() => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

//messageDetection
fs.readdir("./commands/", (err, files) => {
	files.forEach(filename=>{
		require(`./commands/${filename}`).run(client)
	})
})
client.on("messageCreate",async message=>{
})

// Log in to Discord with your client's token
client.login(botToken);
