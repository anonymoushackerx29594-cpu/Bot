module.exports = {

    name: "groupinfo",

    description: "Affiche les informations du groupe",

    async execute(sock, msg, args) {

        const groupe = msg.key.remoteJid;

        if (!groupe.endsWith("@g.us")) {

            return sock.sendMessage(
                groupe,
                {
                    text: "❌ Cette commande fonctionne uniquement dans un groupe."
                }
            );

        }

        const metadata =
            await sock.groupMetadata(groupe);

        const nom =
            metadata.subject;

        const description =
            metadata.desc || "Aucune description.";

        const membres =
            metadata.participants.length;

        const admins =
            metadata.participants.filter(
                p => p.admin
            ).length;

        const createur =
            metadata.owner
                ? metadata.owner.split("@")[0]
                : "Inconnu";

        const message = `
╭━━━〔 📋 GROUP INFO 〕━━━╮

📛 Nom : ${nom}

👥 Membres : ${membres}

👑 Administrateurs : ${admins}

👤 Créateur : ${createur}

📝 Description :
${description}

╰━━━━━━━━━━━━━━━━━━╯

🤖 King 👑 Bot
`;

        await sock.sendMessage(
            groupe,
            {
                text: message
            }
        );

    }

};