// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { token } = require('./config.json');
const file = new AttachmentBuilder('/Users/nuru/Desktop/VsCode/Test_bot/Images/asd.jpeg')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });

const date = new Date();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
    console.log(`Received message with content: ${message.content}`);
    console.log(`Message author: ${message.author.tag}`);
    console.log(`Message guild: ${message.guild}`);
    
    if (message.content === '!Hello') {
      message.channel.send('Hi:       ' + message.author.tag);
    }
    if(message.author.tag === client) {
        return;
    }
    if(message.content === "date") {
        message.reply(`Today's Date: ${date.toDateString()}`);
    }
    if(message.content.startsWith("!create-event")) {
        const args = message.content.slice("!create-event".length).trim().split(/ +/);
        const eventName = args.shift();
        const eventDate = args[0];
        const eventTime = args[1] + " " + args[2];
        console.log(eventDate);
        console.log(eventName);

         const embed  = new EmbedBuilder()
         .setTitle(`Event name :` + eventName)
        .setDescription('CS480 meeting' + "Link: "  + "https://discord.com/channels/1090749092084318228/1090768590657040505")
         .setColor('#ff0000')
         .setThumbnail('attachment://asd.jpeg')
         .setTimestamp(Date.now())
         .addFields(
            {name: "Event Name",
                value: eventName,
                inline: true},
                
            {
                name: "Event Date",
                value: eventDate,
                inline:true
            },
            {
                name: "Event Time",
                value: eventTime,
                inline: true
            }
         )
        .setFooter({text : "CreatedBy :" + message.author.tag});
        
        message.channel.send({ embeds: [embed], files:[file] });

        

    }

  
    });
  
    
// Log in to Discord with your client's token
client.login(token);