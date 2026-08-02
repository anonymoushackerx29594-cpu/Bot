module.exports = {

    name: "close",

    description: "Ferme le groupe",

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

        const participants =
            metadata.participants;


        // Vérifier si l'utilisateur est admin

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
                    text: "❌ Seuls les administrateurs peuvent utiliser cette commande."
                }
            );

        }


        // Vérifier si le bot est admin

        const bot =
            participants.find(
                p =>
                p.id === sock.user.lid ||
                p.phoneNumber === sock.user.id.split(":")[0] + "@s.whatsapp.net"
            );

        if (
            !bot ||
            (
                bot.admin !== "admin" &&
                bot.admin !== "superadmin"
            )
        ) {

            return sock.sendMessage(
                groupe,
                {
                    text: "❌ Je dois être administrateur du groupe."
                }
            );

        }


        // Fermer le groupe

        await sock.groupSettingUpdate(
            groupe,
            "announcement"
        );


        await sock.sendMessage(
            groupe,
            {
                text:
`🔒 *GROUPE FERMÉ*

Seuls les administrateurs peuvent désormais envoyer des messages.

🤖 King 👑 Bot`
            }
        );

    }

};