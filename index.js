const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const translate = require('google-translate-api');
const async = require("async");
const fs = require("fs");
const talkedRecently = new Set();
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return message.channel.send("Please use a server which has this bot in order to use it.\nIf u can't find a server, here is a link to invite me:\nhttps://discordapp.com/api/oauth2/authorize?client_id=478957124542529556&permissions=0&scope=bot");
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray['0'];
  let args = messageArray.slice(1);
  let translateArg = args.slice(1) || messageArray.slice(2);
  let tragetLanguage = args['0'] || messageArray['1'];
  
//  if(cmd === `${prefix}avatar`) {
  //	type "string";

  //@readonly


 // get() displayAvatarURL() {

   // return this.avatarURL || this.defaultAvatarURL;
//}
//message.channel.send("This is the link to your avatar \n" + avatarURL);

 // }
  
  if(cmd == `${prefix}translate`) {
    translate(translateArg + "", {to: tragetLanguage + ""}).then(res => {
        message.channel.send(message.author + ": that translated =\n" + res.text);
        //=> I speak English
    }).catch(err => {
        console.error(err);
    });
}
  
 if(cmd === "<@478957124542529556>") {
     message.channel.send(message.author + "");
 }

 if(cmd === `${prefix}credits`) {
     let botembed = new Discord.RichEmbed()
     .setTitle("Credits")
     .addField("Programmer and boss over the bot and (daddy :heart_eyes:) : ", "<@430447525800181762>")
     .addField("Brainstormer:", "<@!453970692266786816>")
     .addField("Special thanks to:","<@356307333216993281>\n<@413079907669901313>\n<@299495028756054016>\n<@341602886935117835>\n<@415583155005685761>\n<@393412463153905675>\n<@437254213689540610>\n<@326077902989033473>");
     message.channel.send(botembed);
 }
if(cmd === `${prefix}say`) {
    
    if(args.includes("@everyone")) {
        args.splice(/@everyone/g, "@everyoné");
        
    }
    if (args.includes("@here")) {
        args.splice(/@here/g,"@heré");
    }
     let argsSay = args.join(" ");  
    message.channel.send(argsSay);
}

 if(cmd === `${prefix}gayrate` && args == "") {
    let randomnumber = Math.random();
    let gayrate = randomnumber.toString().slice([-2]);
    if (gayrate.startsWith("0")) {
        gayrate = randomnumber.toString().slice([-1]);
    }
    let userGayRate = message.author.username;
    let botembed = new Discord.RichEmbed()
    .setTitle(userGayRate + "'s gayrate")
    .setDescription(userGayRate + " is " + gayrate + "% gay");

    message.channel.send(botembed);
 }
 if(cmd === `${prefix}gayrate`) {
    let gayrateUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!gayrateUser) return;
    let randomnumber = Math.random();
    let gayrate = randomnumber.toString().slice([-2]);
    if (gayrate.startsWith(0)) {
        gayrate = randomnumber.toString().slice([-1]);
    }
    let botembed = new Discord.RichEmbed()
    .setTitle("Gayrate machine")
    .setDescription(gayrateUser + " is " + gayrate + "% gay.");
    message.channel.send(botembed);
    }



 if(cmd === `${prefix}report`) {
    if (talkedRecently.has(message.author.id)) return message.channel.send(message.author + ": You have to wait 1 minute between each report to file a new report");
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rReason  = args.join(" ").slice(22);
    let bicon = rUser.displayAvatarURL;
    let reportEmber = new Discord.RichEmbed()
    .setColor("#ff0000")
    .setDescription("**REPORT**")
    .addField("Reported user:", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported by:", `${message.author} with ID: ${message.author.id}`)
    .addField("Reason:", rReason)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .setThumbnail(bicon);
    message.author.sendMessage("This is a copy that has been sent to the staff team");
    message.author.sendMessage(reportEmber);

    let reportchannel = message.guild.channels.find("name", "spam");
    if(!reportchannel) return message.channel.reply("Channel for staff not found. Contact staff about this!");
    message.delete().catch(O_o=>{});
    reportchannel.send(reportEmber);
    talkedRecently.add(message.author.id);
    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 6000);
    return;
 }
 if(cmd == `${prefix}help`){
    let bicon = bot.displayAvatarURL;
    message.channel.send(`<@${message.author.id}>, check your DM's`);
    let botembed = new Discord.RichEmbed()
    .setColor("#32b0ff")
    .addField("`-help`", "shows this help message containing all commands\n")
    .addField("`-translate` `target-language` `text to be translated`","\ntranslates `text to be translated` to `target-language` for example: `-translate` `nl` `Hello` this translates `Hello` to `nl` (nl = Dutch)\n")
    .addField("`-report` `@user` `reason`", "reports @user to the staff with reason provided (please provide proof within ur reason)\n")
    .addField("`-botinfo`", "shows bot info\n")
    .addField("`-streamtime`", "shows streamtime of iFerg\n")
    .addField("`-gayrate [@user]`", "shows the gayrate of yourself or @user(@user is optional, leave it blank for your own gayrate)")
    .addField("`-credits`","shows credits for the bot e.g. Creator(s)")
    .setThumbnail(bicon);
    message.author.sendMessage(botembed);
    return;
 }



 if(cmd == `${prefix}streamtime`) {
 	let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .addField("Usual stream time:",
"**If there is 1 stream: from 8-9-10 PM UTC+1 untill 12-1-2 AM UTC+1 \nIf there are 2 streams: 1 stream from 3-4-5 PM UTC+1 untill 6-7-8 PM UTC+1 \nand 1 stream from 9-10-11 PM UTC+1 untill 12-1-2 AM UTC+1**")
    .setColor("#15f153")
    .setThumbnail(bicon)
    message.channel.send(botembed);
    }
 	 if (cmd === `${prefix}streamtime` && args === 1) {
 	 	let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .addField("1 stream time",
 	 "	**1 stream: from 8-9-10 PM UTC+1 untill 12-1-2 AM UTC+1**")
 	    .setColor("#15f153")
    .setThumbnail(bicon)
    message.channel.send(botembed);
 	 }
 
  if(cmd === `${prefix}botinfo`) {

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .addField("Bot Information",
"This is a bot coded in JS made for Ferg :slight_smile:")
    .addField("How","Daddy Hyper came by mommy and he went a little too hard and I was created")
    .addField("Commands","Use `-help` to get help with commands")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    message.channel.send(botembed);
}});

bot.login(process.env.BOT_TOKEN);
