module.exports = {

    name: "info",

    description: "Affiche les informations du bot",

    async execute(sock, msg, args) {


        const info = `
╭━━━〔 🤖 KING 👑 BOT 〕━━━╮

🤖 Nom : King Bot

👤 Créateur : 𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭 亗K͜͡ɪɴɢウ 🅰🅽🅾🅽🆈🅼🅾🆄🆂

⚡ Statut : En ligne

📦 Version : 1.0.0

🛠️ Technologie :
• Node.js
• Baileys

📌 Préfixe : .

🔥 Merci d'utiliser King 👑 Bot

╰━━━━━━━━━━━━━━━━━━╯
        `;


        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: info
            }
        );


    }

};