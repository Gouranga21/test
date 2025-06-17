const login = require("facebook-chat-api");
const fs = require("fs");

const appState = require("./fbstate.json");   // তোমার Facebook session
const botConfig = require("./bot.json");      // trigger/response config

login({ appState }, (err, api) => {
    if (err) return console.error("❌ Login failed:", err);

    console.log("✅ Bot is logged in and running...");

    api.listenMqtt((err, message) => {
        if (err) return console.error("❌ Error while listening:", err);

        console.log("📨 Received message:", message);

        // ✅ শুধু গ্রুপ মেসেজের জন্য
        if (!message.isGroup) return;

        // ✅ মেসেজ চেক করে রিপ্লাই
        for (const item of botConfig.responses) {
            if (
                message.body &&
                message.body.toLowerCase().includes(item.trigger.toLowerCase())
            ) {
                api.sendMessage(item.reply, message.threadID);
                console.log(`↪️ Replied to: ${item.trigger}`);
                break;
            }
        }
    });
});
