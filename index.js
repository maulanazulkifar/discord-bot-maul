const axios = require("axios");
const {
  Client,
  GatewayIntentBits,
  Partials,
  VoiceChannel,
} = require("discord.js");
const ytdl = require("ytdl-core");
const cheerio = require("cheerio");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("messageCreate", (message) => {
  // Contoh penggunaan

  // Pastikan pesan bukan dari bot dan dimulai dengan prefiks Anda (misalnya "!")
  if (!message.author.bot && message.content.startsWith("!")) {
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Tanggapi perintah 'ping'
    if (command === "tanyamaul") {
      chatWithGPT(message.content)
        .then((outputText) => {
          message.reply(outputText);
          console.log("GPT Response:", outputText);
        })
        .catch((error) => {
          console.error("Failed to chat with GPT:", error);
        });
    }
    if (command === "rank") {
      message.reply("Rank aku Iron 3 tapi aku sudah tumbuh dan berkembang :)");
    }
    if (command === "pacaradan") {
      message.reply("Beby");
    }
    if (command === "pacarcece") {
      message.reply("Adhinata");
    }
    if (command === "pacarafung") {
      message.reply("Masi kecil gabole pacaran dulu");
    }
    if (command === "pacarmaul") {
      message.reply("The one and only Valarie Santhya Vortexio");
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});
// Fungsi untuk mengirim permintaan ke API GPT
async function chatWithGPT(message) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Sesuaikan model sesuai kebutuhan Anda
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.9,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

client.login(
  "MTIxMDUxNjc4NzU1MzM3NDI2OA.GXIy-Y.omtMJtm8czxuvI4pF5kze_d2cyxxfXqCaNK7RI"
);
