module.exports = {

    name: "tagall",

    description: "Mentionne tous les membres du groupe",

    async execute(sock, msg, args) {


        if (!msg.key.remoteJid.endsWith("@g.us")) {

            return sock.sendMessage(
                msg.key.remoteJid,
                {
                    text: "❌ Cette commande fonctionne uniquement dans un groupe."
                }
            );

        }


        const groupMetadata =
            await sock.groupMetadata(
                msg.key.remoteJid
            );


        const membres =
            groupMetadata.participants;


        const nomGroupe =
            groupMetadata.subject;



        let texte = `
╭━━━〔 📢 KING 👑 TAG ALL 〕━━━╮

👥 Groupe : ${nomGroupe}

📌 Membres mentionnés : ${membres.length}

━━━━━━━━━━━━━━━━━━

`;



        for (let membre of membres) {

            texte += `👤 @${membre.id.split("@")[0]}\n`;

        }



        texte += `
━━━━━━━━━━━━━━━━━━

⚡ Message envoyé par King 👑 Bot 🤖

╰━━━━━━━━━━━━━━━━━━╯
`;



        await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: texte,
                mentions: membres.map(
                    membre => membre.id
                )
            }
        );


    }

};