const login = require("facebook-chat-api");
const fs = require("fs");

const appState = require("./fbstate.json");
const botConfig = require("./bot.json");

login({ appState }, (err, api) => {
    if (err) return console.error(err);

    api.listenMqtt((err, message) => {
        if (err) return console.error(err);

        for (const item of botConfig.responses) {
            if (message.body.toLowerCase().includes(item.trigger.toLowerCase())) {
                api.sendMessage(item.reply, message.threadID);
                break;
            }
        }
    });
});
