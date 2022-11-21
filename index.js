const fs = require("fs");
const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
  authStrategy: new LocalAuth(),
});

let busy = false;

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const mentions = await msg.getMentions();
  const message = msg.body.toLowerCase();
  if (mentions.includes("<Aniket />")) {
    msg.reply(busy ? "Abhi thora busy hai..." : "1 sec...");
  }
  if (message.includes("hi") && message.indexOf("hi") === 0) {
    client.sendMessage(msg.from, "hi");
  } else if (message.includes("good morning")) {
    client.sendMessage(msg.from, "Good morning");
  } else if (message.includes("good night")) {
    client.sendMessage(msg.from, "Good night, sweet dreams");
  } else if (message.includes("bye")) {
    msg.reply("Bye");
  }
});

client.initialize();
