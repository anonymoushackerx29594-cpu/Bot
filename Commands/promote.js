module.exports = {

    name: "promote",

    description: "Donne les droits admin à un membre",

    async execute(sock, msg, args) {


        const groupe = msg.key.remoteJid;


        if (!groupe.endsWith("@g.us")) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "❌ Cette commande fonctionne uniquement dans un groupe."
                }
            );

        }



        const metadata =
            await sock.groupMetadata(groupe);


        const participants =
            metadata.participants;



        const expediteur =
            msg.key.participant;



        const admin =
            participants.find(
                p => p.id === expediteur
            );


        if (
            !admin ||
            (
                admin.admin !== "admin" &&
                admin.admin !== "superadmin"
            )
        ) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "❌ Seuls les administrateurs peuvent utiliser cette commande."
                }
            );

        }



        const mention =
            msg.message
            ?.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid;



        if (!mention || mention.length === 0) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "⚠️ Mentionne un membre.\n\nExemple : !promote @membre"
                }
            );

        }



        await sock.groupParticipantsUpdate(
            groupe,
            [
                mention[0]
            ],
            "promote"
        );



        await sock.sendMessage(
            groupe,
            {
                text:
                `👑 @${mention[0].split("@")[0]} est maintenant administrateur.`,
                mentions: [
                    mention[0]
                ]
            }
        );


    }

};