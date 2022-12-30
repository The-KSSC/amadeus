// Require the necessary discord.js classes
const fs = require("fs")
const path = require("path")
const fetch = require("node-fetch");
const { botToken,htbToken } = require('./config.json');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
/*const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildMessages] }); Don't need? */

// When the client is ready, run this code (only once)
client.on("ready",() => {
	console.log(`Ready! Logged in as ${client.user.tag}`);
});

//collection of commands: 
//https://discord.js.org/#/docs/collection/main/class/Collection
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    //Set a new item in the Collection with the key as the command name
    //and the value as the exported module
    if('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }else{
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

//Executing commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



/*
//messageDetection
fs.readdir("./commands/", (err, files) => {
	files.forEach(filename=>{
		require(`./commands/${filename}`).run(client)
	})
})
*/

// Log in to Discord with your client's token
client.login(botToken);
