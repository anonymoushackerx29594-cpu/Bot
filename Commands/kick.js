module.exports = {

    name: "kick",

    description: "Expulse un membre du groupe",

    async execute(sock, msg, args) {


        const groupe = msg.key.remoteJid;


        if (!groupe.endsWith("@g.us")) {
            return sock.sendMessage(
                groupe,
                {
                    text: "❌ Groupe uniquement."
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
            !admin.admin
        ) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "❌ Tu dois être administrateur."
                }
            );

        }



        const mention =
            msg.message
            ?.extendedTextMessage
            ?.contextInfo
            ?.mentionedJid;



        if (!mention) {

            return sock.sendMessage(
                groupe,
                {
                    text:
                    "⚠️ Mentionne quelqu'un."
                }
            );

        }



        let cible = mention[0];



        const membre =
            participants.find(
                p => p.id === cible
            );



        if (membre?.phoneNumber) {

            cible =
            membre.phoneNumber;

        }



        await sock.groupParticipantsUpdate(
            groupe,
            [
                cible
            ],
            "remove"
        );


        await sock.sendMessage(
            groupe,
            {
                text:
                "✅ Membre retiré."
            }
        );


    }

};