const axios = require("axios");
const {
  Client,
  GatewayIntentBits,
  Partials,
  VoiceChannel,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
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
    if (command === "tanyacoco") {
      const commandWithoutPrefix = message.content.slice(
        message.content.indexOf(" ") + 1
      );
      if (commandWithoutPrefix === "aku ke kota ga hari ini?") {
        message.reply("jangan ke kota mending sentuh rumput");
      } else if (commandWithoutPrefix === "1+1?") {
        message.reply("3");
      } else if (commandWithoutPrefix === "Asal usul cocona?") {
        message.reply(
          "Cocona choco vortexio terbuat dari olahan bihun dan nata de coco, terbuat pada hari sabtu di tenda biru"
        );
      } else if (commandWithoutPrefix === "Warna kesukaan coco?") {
        message.reply(
          "Cocona choco vortexio memiliki warna rambut cyan tapi jangan terkecoh sebenarnya ia lebih suka warna hijau daun"
        );
      } else if (commandWithoutPrefix === "apa kesukaan coco?") {
        message.reply(
          "coco sangat suka mobil kedip"
        );
      } else if (commandWithoutPrefix === "apa kesukaan coco?") {
        message.reply(
          "coco sangat suka mobil kedip"
        );
      } else if (commandWithoutPrefix === "berapa banyak anak coco?") {
        message.reply(
          "anak coco terdiri dari melon, kiiro, ichigo, takumi, myata"
        );
      } else if (commandWithoutPrefix === "makanan kesukaan coco?") {
        message.reply(
          "cococruutt berapa croott?"
        );
      } else if (commandWithoutPrefix === "kota jangan?") {
        message.reply(
          "JANGAN"
        );
      } else if (commandWithoutPrefix === "berapa umur coco?") {
        message.reply(
          "0:0=UNDEFINED"
        );
      } else if (commandWithoutPrefix === "Siapa bapak coco?") {
        message.reply(
          "bihun buapak terdebest"
        );
      }else if (commandWithoutPrefix === "kota ga bos?") {
        message.reply(
          "skip, mending turu"
        );
      } else {
        chatWithGPT(message.content)
          .then((outputText) => {
            message.reply(outputText);
            console.log("GPT Response:", outputText);
          })
          .catch((error) => {
            console.error("Failed to chat with GPT:", error);
          });
      }
    }
    if (command === "cocokga") {
      console.log(message.content);
      // Membuang bagian "!cocokga" dari string command
      const commandWithoutPrefix = message.content.slice(
        message.content.indexOf(" ") + 1
      );

      // Memisahkan string berdasarkan tanda "+" dan membersihkan spasi
      const [sname, fname] = commandWithoutPrefix
        .split("+")
        .map((str) => str.trim());
      if (sname === "Maulana Zulkifar" || fname === "Maulana Zulkifar") {
        message.reply(`Tidak bisa memberikan tanggapan`);
      } else if (sname === "maul" || fname === "maul") {
        message.reply(
          `Tidak bisa memberikan tanggapan, karena maul pria idaman bagi semua wanita`
        );
      } else if (sname === "tias q vortexio" || fname === "sanstos b nostra") {
        message.reply(
          `0, grim reaper near you`
        );
      } else if (sname === "udon" || fname === "tiffany") {
        message.reply(
          `100, best couple eveeeer`
        );
      } else if (sname === "udon" || fname === "serena") {
        message.reply(
          `50:50 depends on you`
        );
      } else if (sname === "goki" || fname === "kath") {
        message.reply(
          `whats wrong with you?`
        );
      } else if (sname === "bram" && fname === "coco") {
        message.reply(
          `100,love birds`
        );
      } else if (sname === "lopez" && fname === "coco") {
        message.reply(
          `0, grim reaper near you`
        );
      } else if (sname === "cang" && fname === "coco") {
        message.reply(
          `75, but he leaves`
        );
      } else if (sname === "abel" && fname === "coco") {
        message.reply(
          `5, grim reaper near you`
        );
      } else if (sname === "james" && fname === "coco") {
        message.reply(
          `50:50`
        );
      } else {
        loveMeter(fname, sname).then((res) => {
          message.reply(`${res.percentage}, ${res.result}`);
        });
      }
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

async function loveMeter(fname, sname) {
  try {
    const response = await axios.get(
      `https://love-calculator.p.rapidapi.com/getPercentage?sname=${sname}&fname=${fname}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "6fb0c86bbbmsh7f2bfa730abf6dap165303jsn6a28a3cf0055",
          "X-RapidAPI-Host": `love-calculator.p.rapidapi.com`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error.response.data);
  }
}

client.login(
  "MTIyMjM3NTc3MTgwNTMxOTIzOA.GsRUHK.5Zzi5CsWoHWrGtnb2CkuiAXPGq20ddwjvThIQc"
);
