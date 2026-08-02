module.exports = {

    name: "hidetag",

    description: "Mentionne tous les membres avec un message personnalisé",

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

        const message =
            args.length > 0
                ? args.join(" ")
                : "📢 Message de l'administration.";

        await sock.sendMessage(
            groupe,
            {
                text: `📢 ${message}`,
                mentions: participants.map(
                    p => p.id
                )
            }
        );

    }

};